"""
Backend API Testing for My Inbox Media® Website
Tests all endpoints including external data, contact form, auth, and admin operations
"""
import requests
import sys
from datetime import datetime
import json

class MIMAPITester:
    def __init__(self, base_url="https://mim-evolution.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_result(self, test_name, passed, status_code=None, message=""):
        """Log test result"""
        self.tests_run += 1
        if passed:
            self.tests_passed += 1
            print(f"✅ {test_name} - PASSED (Status: {status_code})")
        else:
            print(f"❌ {test_name} - FAILED (Status: {status_code}) - {message}")
        
        self.test_results.append({
            "test": test_name,
            "passed": passed,
            "status_code": status_code,
            "message": message
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=15)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=15)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=15)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=15)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, params=params, timeout=15)

            success = response.status_code == expected_status
            
            if success:
                self.log_result(name, True, response.status_code)
                try:
                    return True, response.json()
                except:
                    return True, {}
            else:
                try:
                    error_detail = response.json().get('detail', response.text)
                except:
                    error_detail = response.text
                self.log_result(name, False, response.status_code, error_detail)
                return False, {}

        except requests.Timeout:
            self.log_result(name, False, None, "Request timeout (15s)")
            return False, {}
        except Exception as e:
            self.log_result(name, False, None, str(e))
            return False, {}

    def test_health_check(self):
        """Test health check endpoint"""
        print("\n🔍 Testing Health Check...")
        success, response = self.run_test(
            "Health Check",
            "GET",
            "health",
            200
        )
        return success

    def test_root_endpoint(self):
        """Test root endpoint"""
        print("\n🔍 Testing Root Endpoint...")
        success, response = self.run_test(
            "Root Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_external_services(self):
        """Test external services endpoint"""
        print("\n🔍 Testing External Services...")
        success, response = self.run_test(
            "Get External Services",
            "GET",
            "external/services",
            200
        )
        if success and response.get('data'):
            print(f"   📊 Retrieved {len(response['data'])} services")
            if len(response['data']) >= 8:
                print(f"   ✅ Expected 8 services, got {len(response['data'])}")
            else:
                print(f"   ⚠️  Expected 8 services, got {len(response['data'])}")
        return success

    def test_external_clients(self):
        """Test external clients endpoint"""
        print("\n🔍 Testing External Clients...")
        success, response = self.run_test(
            "Get External Clients",
            "GET",
            "external/clients",
            200
        )
        if success and response.get('data'):
            print(f"   📊 Retrieved {len(response['data'])} client logos")
            if len(response['data']) >= 70:
                print(f"   ✅ Expected 70+ clients, got {len(response['data'])}")
            else:
                print(f"   ⚠️  Expected 70+ clients, got {len(response['data'])}")
        return success

    def test_contact_form(self):
        """Test contact form submission"""
        print("\n🔍 Testing Contact Form...")
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+1234567890",
            "service": "SMS Solutions",
            "message": "This is a test message for contact form validation."
        }
        success, response = self.run_test(
            "Submit Contact Form",
            "POST",
            "contact",
            200,
            data=contact_data
        )
        if success:
            print(f"   ✅ Contact form submitted successfully")
        return success

    def test_blog_endpoints(self):
        """Test blog endpoints"""
        print("\n🔍 Testing Blog Endpoints...")
        
        # Get all blog posts
        success1, response = self.run_test(
            "Get Blog Posts",
            "GET",
            "blog",
            200,
            params={"page": 1, "limit": 10}
        )
        if success1:
            print(f"   📊 Retrieved {len(response.get('data', []))} blog posts")
        
        return success1

    def test_testimonials_endpoint(self):
        """Test testimonials endpoint"""
        print("\n🔍 Testing Testimonials Endpoint...")
        success, response = self.run_test(
            "Get Testimonials",
            "GET",
            "testimonials",
            200
        )
        if success:
            print(f"   📊 Retrieved {len(response.get('data', []))} testimonials")
        return success

    def test_case_studies_endpoint(self):
        """Test case studies endpoint"""
        print("\n🔍 Testing Case Studies Endpoint...")
        success, response = self.run_test(
            "Get Case Studies",
            "GET",
            "case-studies",
            200
        )
        if success:
            print(f"   📊 Retrieved {len(response.get('data', []))} case studies")
        return success

    def test_admin_login(self):
        """Test admin login"""
        print("\n🔍 Testing Admin Login...")
        login_data = {
            "email": "admin@myinboxmedia.com",
            "password": "Admin@123"
        }
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "auth/login",
            200,
            data=login_data
        )
        if success and 'access_token' in response:
            self.token = response['access_token']
            print(f"   ✅ Login successful, token obtained")
            return True
        else:
            print(f"   ❌ Login failed or no token received")
            return False

    def test_admin_get_current_user(self):
        """Test get current user endpoint"""
        print("\n🔍 Testing Get Current User...")
        if not self.token:
            print("   ⚠️  Skipping - No token available")
            return False
        
        success, response = self.run_test(
            "Get Current User",
            "GET",
            "auth/me",
            200
        )
        if success:
            print(f"   ✅ User info retrieved: {response.get('email', 'N/A')}")
        return success

    def test_admin_blog_operations(self):
        """Test admin blog CRUD operations"""
        print("\n🔍 Testing Admin Blog Operations...")
        if not self.token:
            print("   ⚠️  Skipping - No token available")
            return False

        # Create blog post
        blog_data = {
            "title": "Test Blog Post",
            "content": "This is a test blog post content with sufficient length to meet the minimum character requirement for validation. This content is being used for automated testing purposes.",
            "excerpt": "Test excerpt for the blog post",
            "author": "Test Author",
            "category": "Technology",
            "tags": ["test", "automation"],
            "published": False
        }
        success1, response = self.run_test(
            "Create Blog Post",
            "POST",
            "admin/blog",
            200,
            data=blog_data
        )
        
        blog_id = None
        if success1 and response.get('post_id'):
            blog_id = response['post_id']
            print(f"   ✅ Blog post created with ID: {blog_id}")
        
        # Update blog post
        if blog_id:
            update_data = {
                "title": "Updated Test Blog Post",
                "published": True
            }
            success2, _ = self.run_test(
                "Update Blog Post",
                "PUT",
                f"admin/blog/{blog_id}",
                200,
                data=update_data
            )
        else:
            success2 = False
            self.log_result("Update Blog Post", False, None, "No blog ID to update")
        
        # Delete blog post
        if blog_id:
            success3, _ = self.run_test(
                "Delete Blog Post",
                "DELETE",
                f"admin/blog/{blog_id}",
                200
            )
        else:
            success3 = False
            self.log_result("Delete Blog Post", False, None, "No blog ID to delete")
        
        return success1 and success2 and success3

    def test_admin_testimonial_operations(self):
        """Test admin testimonial CRUD operations"""
        print("\n🔍 Testing Admin Testimonial Operations...")
        if not self.token:
            print("   ⚠️  Skipping - No token available")
            return False

        # Create testimonial
        testimonial_data = {
            "client_name": "Test Client",
            "client_position": "CEO",
            "client_company": "Test Company",
            "testimonial_text": "This is a test testimonial.",
            "rating": 5,
            "published": False,
            "featured": False
        }
        success1, response = self.run_test(
            "Create Testimonial",
            "POST",
            "admin/testimonials",
            200,
            data=testimonial_data
        )
        
        testimonial_id = None
        if success1 and response.get('testimonial_id'):
            testimonial_id = response['testimonial_id']
            print(f"   ✅ Testimonial created with ID: {testimonial_id}")
        
        # Delete testimonial
        if testimonial_id:
            success2, _ = self.run_test(
                "Delete Testimonial",
                "DELETE",
                f"admin/testimonials/{testimonial_id}",
                200
            )
        else:
            success2 = False
            self.log_result("Delete Testimonial", False, None, "No testimonial ID to delete")
        
        return success1 and success2

    def test_admin_case_study_operations(self):
        """Test admin case study CRUD operations"""
        print("\n🔍 Testing Admin Case Study Operations...")
        if not self.token:
            print("   ⚠️  Skipping - No token available")
            return False

        # Create case study
        case_study_data = {
            "title": "Test Case Study",
            "client_name": "Test Client",
            "industry": "Technology",
            "challenge": "Test challenge description with sufficient length to meet the minimum character requirement for validation purposes in automated testing.",
            "solution": "Test solution description with sufficient length to meet the minimum character requirement for validation purposes in automated testing.",
            "results": "Test results description with sufficient length to meet the minimum character requirement for validation purposes in automated testing.",
            "published": False
        }
        success1, response = self.run_test(
            "Create Case Study",
            "POST",
            "admin/case-studies",
            200,
            data=case_study_data
        )
        
        case_study_id = None
        if success1 and response.get('case_study_id'):
            case_study_id = response['case_study_id']
            print(f"   ✅ Case study created with ID: {case_study_id}")
        
        # Delete case study
        if case_study_id:
            success2, _ = self.run_test(
                "Delete Case Study",
                "DELETE",
                f"admin/case-studies/{case_study_id}",
                200
            )
        else:
            success2 = False
            self.log_result("Delete Case Study", False, None, "No case study ID to delete")
        
        return success1 and success2

    def test_admin_contacts(self):
        """Test admin contacts endpoint"""
        print("\n🔍 Testing Admin Contacts...")
        if not self.token:
            print("   ⚠️  Skipping - No token available")
            return False

        success, response = self.run_test(
            "Get Admin Contacts",
            "GET",
            "admin/contacts",
            200,
            params={"page": 1, "limit": 20}
        )
        if success:
            print(f"   📊 Retrieved {len(response.get('data', []))} contact messages")
        return success

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        print("="*60)
        
        return self.tests_passed == self.tests_run


def main():
    print("="*60)
    print("🚀 My Inbox Media® Backend API Testing")
    print("="*60)
    
    tester = MIMAPITester()
    
    # Run all tests
    tester.test_health_check()
    tester.test_root_endpoint()
    tester.test_external_services()
    tester.test_external_clients()
    tester.test_contact_form()
    tester.test_blog_endpoints()
    tester.test_testimonials_endpoint()
    tester.test_case_studies_endpoint()
    
    # Admin tests (require login)
    if tester.test_admin_login():
        tester.test_admin_get_current_user()
        tester.test_admin_blog_operations()
        tester.test_admin_testimonial_operations()
        tester.test_admin_case_study_operations()
        tester.test_admin_contacts()
    
    # Print summary
    all_passed = tester.print_summary()
    
    return 0 if all_passed else 1


if __name__ == "__main__":
    sys.exit(main())
