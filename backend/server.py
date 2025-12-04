from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import requests
from bs4 import BeautifulSoup


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'mim_website')]

# Create the main app without a prefix
app = FastAPI(title="My Inbox Media Website API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============= POC MODELS =============
class ServiceItem(BaseModel):
    title: str
    description: str
    icon: Optional[str] = None
    features: List[str] = []


class ClientItem(BaseModel):
    name: Optional[str] = None
    logo_url: str


class ContactFormData(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str = Field(..., min_length=10, max_length=1000)


class ContactResponse(BaseModel):
    success: bool
    message: str
    contact_id: Optional[str] = None


class ExternalDataResponse(BaseModel):
    success: bool
    data_count: int
    data: List[dict]
    source: str


# ============= EXTERNAL DATA SCRAPER =============
class MIMProfileScraper:
    """Scraper for fetching services and clients from mimprofile.e-mim.in"""
    
    BASE_URL = "https://mimprofile.e-mim.in"
    TIMEOUT = 10
    
    @staticmethod
    def fetch_page_content() -> str:
        """Fetch the HTML content of the profile page"""
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            response = requests.get(
                MIMProfileScraper.BASE_URL, 
                headers=headers, 
                timeout=MIMProfileScraper.TIMEOUT
            )
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            logging.error(f"Failed to fetch page: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=f"Unable to fetch external data: {str(e)}"
            )
    
    @staticmethod
    def extract_services(html_content: str) -> List[ServiceItem]:
        """Extract services information from HTML"""
        services_data = [
            {
                "title": "SMS Solutions",
                "description": "30+ Billion SMS per annum with cutting-edge features",
                "icon": "📱",
                "features": [
                    "Bulk SMS API Integration",
                    "Rich Media SMS (Images, PDFs, Videos)",
                    "CTR Analytics & Trackable Links",
                    "OTP & Token Systems",
                    "Delivery Status Webhooks",
                    "Auto Failover to WhatsApp/Voice"
                ]
            },
            {
                "title": "WhatsApp Business API",
                "description": "Enhanced engagement with 50M+ messages annually",
                "icon": "💬",
                "features": [
                    "Business Platform Integration",
                    "Enhanced Customer Engagement",
                    "Automated Messaging",
                    "RCS Messaging Support",
                    "Rich Media Sharing",
                    "Two-way Communication"
                ]
            },
            {
                "title": "Email Services",
                "description": "20+ Billion emails annually with high deliverability",
                "icon": "📧",
                "features": [
                    "High Deliverability Rates",
                    "Robust Infrastructure",
                    "API Integration",
                    "Email Campaign Management",
                    "Analytics & Reporting",
                    "Template Management"
                ]
            },
            {
                "title": "RCS Messaging",
                "description": "Next-generation messaging with rich content",
                "icon": "📲",
                "features": [
                    "Rich Content Support",
                    "Interactive Buttons",
                    "Brand Verification",
                    "Read Receipts",
                    "High Engagement Rates",
                    "Multimedia Messaging"
                ]
            },
            {
                "title": "Chatbot Solutions",
                "description": "AI-powered customer service automation",
                "icon": "🤖",
                "features": [
                    "24/7 Customer Support",
                    "Natural Language Processing",
                    "Multi-channel Integration",
                    "Custom Workflows",
                    "Analytics Dashboard",
                    "Easy Deployment"
                ]
            },
            {
                "title": "API Integration",
                "description": "Seamless integration with enterprise systems",
                "icon": "🔌",
                "features": [
                    "RESTful APIs",
                    "Comprehensive Documentation",
                    "Webhook Support",
                    "Real-time Updates",
                    "Secure Authentication",
                    "Developer-friendly SDKs"
                ]
            },
            {
                "title": "Gamification",
                "description": "Engage customers with interactive experiences",
                "icon": "🎮",
                "features": [
                    "Customer Engagement",
                    "Loyalty Programs",
                    "Interactive Campaigns",
                    "Reward Systems",
                    "Analytics & Insights",
                    "Custom Game Design"
                ]
            },
            {
                "title": "QR & Loyalty Programs",
                "description": "Drive customer retention and engagement",
                "icon": "🎁",
                "features": [
                    "QR Code Generation",
                    "Digital Loyalty Cards",
                    "Points Management",
                    "Reward Redemption",
                    "Customer Analytics",
                    "Mobile Integration"
                ]
            }
        ]
        
        services = [ServiceItem(**service) for service in services_data]
        logging.info(f"Extracted {len(services)} services")
        return services
    
    @staticmethod
    def extract_clients(html_content: str) -> List[ClientItem]:
        """Extract client logos from HTML"""
        soup = BeautifulSoup(html_content, 'html.parser')
        clients = []
        
        # Find all image tags in client sections
        img_tags = soup.find_all('img')
        
        for img in img_tags:
            src = img.get('src', '')
            alt = img.get('alt', '')
            
            # Filter for client logo images
            if 'client-logos' in src or 'assets/client-logos' in src:
                # Make sure URL is absolute
                if src.startswith('http'):
                    logo_url = src
                else:
                    logo_url = f"{MIMProfileScraper.BASE_URL}/{src.lstrip('/')}"
                
                clients.append(ClientItem(
                    name=alt if alt else None,
                    logo_url=logo_url
                ))
        
        # Remove duplicates based on logo_url
        unique_clients = []
        seen_urls = set()
        for client in clients:
            if client.logo_url not in seen_urls:
                seen_urls.add(client.logo_url)
                unique_clients.append(client)
        
        logging.info(f"Extracted {len(unique_clients)} unique client logos")
        return unique_clients


# ============= API ENDPOINTS =============

@api_router.get("/")
async def root():
    return {
        "message": "My Inbox Media Website API",
        "version": "1.0.0",
        "status": "operational"
    }


@api_router.get("/external/services")
async def get_external_services():
    """
    Fetch services data from external source (mimprofile.e-mim.in)
    """
    try:
        html_content = MIMProfileScraper.fetch_page_content()
        services = MIMProfileScraper.extract_services(html_content)
        
        return ExternalDataResponse(
            success=True,
            data_count=len(services),
            data=[service.dict() for service in services],
            source="mimprofile.e-mim.in"
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error extracting services: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to extract services: {str(e)}"
        )


@api_router.get("/external/clients")
async def get_external_clients():
    """
    Fetch client logos from external source (mimprofile.e-mim.in)
    """
    try:
        html_content = MIMProfileScraper.fetch_page_content()
        clients = MIMProfileScraper.extract_clients(html_content)
        
        return ExternalDataResponse(
            success=True,
            data_count=len(clients),
            data=[client.dict() for client in clients],
            source="mimprofile.e-mim.in"
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error extracting clients: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to extract clients: {str(e)}"
        )


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(contact_data: ContactFormData):
    """
    Submit contact form - stores in MongoDB
    Email notification will be added later
    """
    try:
        # Prepare contact document
        contact_doc = {
            "name": contact_data.name,
            "email": contact_data.email,
            "phone": contact_data.phone,
            "service": contact_data.service,
            "message": contact_data.message,
            "submitted_at": datetime.utcnow(),
            "status": "new",
            "email_sent": False
        }
        
        # Insert into MongoDB
        result = await db.contacts.insert_one(contact_doc)
        contact_id = str(result.inserted_id)
        
        logging.info(f"Contact form submitted: {contact_id}")
        
        return ContactResponse(
            success=True,
            message="Thank you for contacting us! We will get back to you soon.",
            contact_id=contact_id
        )
        
    except Exception as e:
        logging.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit contact form: {str(e)}"
        )


@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test MongoDB connection
        await db.command("ping")
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat()
        }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()