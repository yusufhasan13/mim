"""
Core POC Test Script for My Inbox Media Website
Tests all Phase 1 user stories in isolation before building main app
"""
import sys
import os
import time
import requests
from datetime import datetime
from colorama import Fore, Style, init

# Initialize colorama
init(autoreset=True)

# Test configuration
BASE_URL = "http://localhost:8001"
TIMEOUT = 20

# Test results tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "tests": []
}


def print_header(text):
    """Print formatted header"""
    print(f"\n{Fore.CYAN}{'=' * 70}")
    print(f"{Fore.CYAN}{text.center(70)}")
    print(f"{Fore.CYAN}{'=' * 70}{Style.RESET_ALL}\n")


def print_test(test_name):
    """Print test name"""
    print(f"{Fore.YELLOW}🧪 Testing: {test_name}{Style.RESET_ALL}")


def print_success(message):
    """Print success message"""
    print(f"{Fore.GREEN}✅ {message}{Style.RESET_ALL}")
    test_results["passed"] += 1


def print_error(message):
    """Print error message"""
    print(f"{Fore.RED}❌ {message}{Style.RESET_ALL}")
    test_results["failed"] += 1


def print_info(message):
    """Print info message"""
    print(f"{Fore.BLUE}ℹ️  {message}{Style.RESET_ALL}")


def record_test(test_name, passed, details=""):
    """Record test result"""
    test_results["tests"].append({
        "name": test_name,
        "passed": passed,
        "details": details,
        "timestamp": datetime.now().isoformat()
    })


def test_health_check():
    """Test 1: Server health check"""
    print_test("Server Health Check")
    
    try:
        response = requests.get(f"{BASE_URL}/api/health", timeout=TIMEOUT)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "healthy" and data.get("database") == "connected":
                print_success("Server is healthy and database is connected")
                record_test("Health Check", True, "Server and DB operational")
                return True
            else:
                print_error(f"Server unhealthy: {data}")
                record_test("Health Check", False, f"Unhealthy response: {data}")
                return False
        else:
            print_error(f"Health check failed with status {response.status_code}")
            record_test("Health Check", False, f"Status code: {response.status_code}")
            return False
            
    except Exception as e:
        print_error(f"Health check exception: {str(e)}")
        record_test("Health Check", False, f"Exception: {str(e)}")
        return False


def test_external_services():
    """Test 2: External services data fetching"""
    print_test("External Services Data Fetching")
    
    try:
        start_time = time.time()
        response = requests.get(f"{BASE_URL}/api/external/services", timeout=TIMEOUT)
        elapsed_time = time.time() - start_time
        
        if response.status_code != 200:
            print_error(f"Services endpoint returned status {response.status_code}")
            record_test("External Services", False, f"Status: {response.status_code}")
            return False
        
        data = response.json()
        
        # Check response structure
        if not data.get("success"):
            print_error("Response indicates failure")
            record_test("External Services", False, "Success flag is False")
            return False
        
        services = data.get("data", [])
        service_count = len(services)
        
        # POC User Story: Should return at least 6 services
        if service_count < 6:
            print_error(f"Expected at least 6 services, got {service_count}")
            record_test("External Services", False, f"Only {service_count} services")
            return False
        
        # Check response time (should be under 2 seconds per user story)
        if elapsed_time > 2.0:
            print_error(f"Response time too slow: {elapsed_time:.2f}s (expected < 2s)")
            record_test("External Services", False, f"Slow response: {elapsed_time:.2f}s")
            return False
        
        # Validate service structure
        for idx, service in enumerate(services[:3]):  # Check first 3
            if not service.get("title") or not service.get("description"):
                print_error(f"Service {idx} missing required fields")
                record_test("External Services", False, f"Invalid service structure at index {idx}")
                return False
        
        print_success(f"Successfully fetched {service_count} services in {elapsed_time:.2f}s")
        print_info(f"Sample services: {', '.join([s['title'] for s in services[:3]])}")
        record_test("External Services", True, f"{service_count} services in {elapsed_time:.2f}s")
        return True
        
    except Exception as e:
        print_error(f"Services test exception: {str(e)}")
        record_test("External Services", False, f"Exception: {str(e)}")
        return False


def test_external_clients():
    """Test 3: External clients data fetching"""
    print_test("External Clients Data Fetching")
    
    try:
        start_time = time.time()
        response = requests.get(f"{BASE_URL}/api/external/clients", timeout=TIMEOUT)
        elapsed_time = time.time() - start_time
        
        if response.status_code != 200:
            print_error(f"Clients endpoint returned status {response.status_code}")
            record_test("External Clients", False, f"Status: {response.status_code}")
            return False
        
        data = response.json()
        
        # Check response structure
        if not data.get("success"):
            print_error("Response indicates failure")
            record_test("External Clients", False, "Success flag is False")
            return False
        
        clients = data.get("data", [])
        client_count = len(clients)
        
        # POC User Story: Should return at least 40 client logos when available
        if client_count < 40:
            print_error(f"Expected at least 40 client logos, got {client_count}")
            record_test("External Clients", False, f"Only {client_count} clients")
            return False
        
        # Check response time
        if elapsed_time > 2.0:
            print_error(f"Response time too slow: {elapsed_time:.2f}s")
            record_test("External Clients", False, f"Slow response: {elapsed_time:.2f}s")
            return False
        
        # Validate client structure - at least should have logo_url
        for idx, client in enumerate(clients[:5]):  # Check first 5
            if not client.get("logo_url"):
                print_error(f"Client {idx} missing logo_url")
                record_test("External Clients", False, f"Invalid client at index {idx}")
                return False
        
        print_success(f"Successfully fetched {client_count} client logos in {elapsed_time:.2f}s")
        print_info(f"Sample logo URLs: {clients[0]['logo_url'][:50]}...")
        record_test("External Clients", True, f"{client_count} clients in {elapsed_time:.2f}s")
        return True
        
    except Exception as e:
        print_error(f"Clients test exception: {str(e)}")
        record_test("External Clients", False, f"Exception: {str(e)}")
        return False


def test_contact_form_submission():
    """Test 4: Contact form submission and storage"""
    print_test("Contact Form Submission & DB Storage")
    
    try:
        # Prepare test contact data
        test_contact = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+1234567890",
            "service": "SMS Solutions",
            "message": "This is a test message for POC validation. Testing contact form functionality."
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=test_contact,
            timeout=TIMEOUT
        )
        
        if response.status_code != 200:
            print_error(f"Contact form returned status {response.status_code}")
            print_error(f"Response: {response.text}")
            record_test("Contact Form", False, f"Status: {response.status_code}")
            return False
        
        data = response.json()
        
        # Check response structure
        if not data.get("success"):
            print_error("Contact form submission indicates failure")
            record_test("Contact Form", False, "Success flag is False")
            return False
        
        contact_id = data.get("contact_id")
        if not contact_id:
            print_error("No contact_id returned")
            record_test("Contact Form", False, "Missing contact_id")
            return False
        
        print_success(f"Contact form submitted successfully (ID: {contact_id})")
        print_info(f"Response message: {data.get('message')}")
        record_test("Contact Form", True, f"Stored with ID: {contact_id}")
        return True
        
    except Exception as e:
        print_error(f"Contact form test exception: {str(e)}")
        record_test("Contact Form", False, f"Exception: {str(e)}")
        return False


def test_contact_form_validation():
    """Test 5: Contact form validation"""
    print_test("Contact Form Input Validation")
    
    try:
        # Test with invalid email
        invalid_contact = {
            "name": "Test",
            "email": "invalid-email",
            "message": "Short msg"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=invalid_contact,
            timeout=TIMEOUT
        )
        
        # Should return 422 for validation error
        if response.status_code != 422:
            print_error(f"Expected validation error (422), got {response.status_code}")
            record_test("Contact Validation", False, f"Wrong status: {response.status_code}")
            return False
        
        print_success("Contact form properly validates invalid inputs")
        record_test("Contact Validation", True, "Validation working")
        return True
        
    except Exception as e:
        print_error(f"Validation test exception: {str(e)}")
        record_test("Contact Validation", False, f"Exception: {str(e)}")
        return False


def test_error_handling():
    """Test 6: Error handling and graceful failures"""
    print_test("Error Handling & Network Resilience")
    
    try:
        # Test non-existent endpoint
        response = requests.get(f"{BASE_URL}/api/nonexistent", timeout=TIMEOUT)
        
        if response.status_code == 404:
            print_success("Properly handles non-existent endpoints with 404")
            record_test("Error Handling", True, "404 for invalid endpoints")
            return True
        else:
            print_error(f"Unexpected status for invalid endpoint: {response.status_code}")
            record_test("Error Handling", False, f"Wrong status: {response.status_code}")
            return False
        
    except Exception as e:
        print_error(f"Error handling test exception: {str(e)}")
        record_test("Error Handling", False, f"Exception: {str(e)}")
        return False


def test_repeated_calls():
    """Test 7: Reliability with repeated calls"""
    print_test("Reliability - Repeated API Calls")
    
    try:
        success_count = 0
        total_calls = 3
        
        for i in range(total_calls):
            response = requests.get(f"{BASE_URL}/api/external/services", timeout=TIMEOUT)
            if response.status_code == 200 and response.json().get("success"):
                success_count += 1
            time.sleep(0.5)  # Small delay between calls
        
        if success_count == total_calls:
            print_success(f"All {total_calls} repeated calls succeeded")
            record_test("Reliability", True, f"{total_calls}/{total_calls} successful")
            return True
        else:
            print_error(f"Only {success_count}/{total_calls} calls succeeded")
            record_test("Reliability", False, f"{success_count}/{total_calls} successful")
            return False
        
    except Exception as e:
        print_error(f"Reliability test exception: {str(e)}")
        record_test("Reliability", False, f"Exception: {str(e)}")
        return False


def print_summary():
    """Print test summary"""
    print_header("TEST SUMMARY")
    
    total_tests = test_results["passed"] + test_results["failed"]
    pass_rate = (test_results["passed"] / total_tests * 100) if total_tests > 0 else 0
    
    print(f"Total Tests: {total_tests}")
    print(f"{Fore.GREEN}Passed: {test_results['passed']}{Style.RESET_ALL}")
    print(f"{Fore.RED}Failed: {test_results['failed']}{Style.RESET_ALL}")
    print(f"Pass Rate: {pass_rate:.1f}%")
    
    print("\n" + "=" * 70)
    
    if test_results["failed"] == 0:
        print(f"{Fore.GREEN}{Style.BRIGHT}")
        print("🎉 ALL POC TESTS PASSED! 🎉")
        print("Core functionality verified. Ready to build main application.")
        print(f"{Style.RESET_ALL}")
        return True
    else:
        print(f"{Fore.RED}{Style.BRIGHT}")
        print("⚠️  SOME TESTS FAILED")
        print("Please fix issues before proceeding to main app development.")
        print(f"{Style.RESET_ALL}")
        
        print("\nFailed Tests:")
        for test in test_results["tests"]:
            if not test["passed"]:
                print(f"  - {test['name']}: {test['details']}")
        
        return False


def main():
    """Main test runner"""
    print_header("MY INBOX MEDIA WEBSITE - POC CORE TESTS")
    print_info(f"Testing against: {BASE_URL}")
    print_info(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Wait for server to be ready
    print_info("Waiting for server to be ready...")
    max_retries = 10
    for i in range(max_retries):
        try:
            response = requests.get(f"{BASE_URL}/", timeout=2)
            if response.status_code == 200:
                print_success("Server is ready!")
                break
        except:
            if i < max_retries - 1:
                time.sleep(2)
            else:
                print_error("Server did not start in time")
                sys.exit(1)
    
    # Run all tests
    print_header("RUNNING POC TESTS")
    
    test_health_check()
    test_external_services()
    test_external_clients()
    test_contact_form_submission()
    test_contact_form_validation()
    test_error_handling()
    test_repeated_calls()
    
    # Print summary and exit
    success = print_summary()
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
