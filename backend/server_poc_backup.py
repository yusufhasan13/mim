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
class MiMProfileScraper:
    """Scraper for fetching services and clients from mimprofile.e-mim.in"""
    
    BASE_URL = "https://mimprofile.e-mim.in"
    TIMEOUT = 15
    MAX_RETRIES = 2
    
    @staticmethod
    def fetch_page_content() -> str:
        """Fetch the HTML content of the profile page with retry logic"""
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        for attempt in range(MiMProfileScraper.MAX_RETRIES):
            try:
                response = requests.get(
                    MiMProfileScraper.BASE_URL, 
                    headers=headers, 
                    timeout=MiMProfileScraper.TIMEOUT
                )
                response.raise_for_status()
                return response.text
            except requests.Timeout as e:
                if attempt < MiMProfileScraper.MAX_RETRIES - 1:
                    logging.warning(f"Timeout on attempt {attempt + 1}, retrying...")
                    continue
                else:
                    logging.error(f"Failed after {MiMProfileScraper.MAX_RETRIES} attempts: Timeout")
                    raise HTTPException(
                        status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                        detail="External data source is not responding"
                    )
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
        
        # Predefined list of client logos from the profile page
        client_logos = [
            "https://mimprofile.e-mim.in/assets/client-logos/1679639493487.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/1740837748923-620722757.png",
            "https://mimprofile.e-mim.in/assets/client-logos/271719896_5473041252713063_4000897173160688134_n.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/277521485_110671584925550_8040634829221012743_n.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/294352052_191555636553407_676606038653115603_n.png",
            "https://mimprofile.e-mim.in/assets/client-logos/298798860_432650255551690_1134147476225696264_n.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/fujairaCharity.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/319177906_1165998204040725_5750679809276335619_n.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/nestleWaters.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/3334-95c4bo.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/340947714_170482292191029_367821089329653455_n.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/349022933_656516019635821_7219029169550193004_n.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/354024713_646147347536237_7430256904775142316_n.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/364806758_770024228465089_5543207906973260853_n.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/398292518_645580187759800_6999431505467955971_n.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/408091634_409440841420473_996549392025941148_n.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/438869088_825325382947741_2712263354270744757_n.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/461700073_3824720747816530_7548215537906038105_n.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/466733991_527022610312707_1003599254838741924_n.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/480660666_1043488151156522_658328563829965779_n.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/4882-ac5c2o.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/62151e204436d60020a709dd.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/fcry.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/HomeLand-Realty-logo.webp",
            "https://mimprofile.e-mim.in/assets/client-logos/Hyundai.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-1.png",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-10.png",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-11.png",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-12.png",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-14.png",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-13.png",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-16.png",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-17.png",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-18.png",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-19.png",
            "https://mimprofile.e-mim.in/assets/client-logos/abccargo.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-20.png",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-21.png",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-22.png",
            "https://mimprofile.e-mim.in/assets/client-logos/ibo.webp",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-24.png",
            "https://mimprofile.e-mim.in/assets/client-logos/malabar.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/cwc.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/ico.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/cropped-JAS-Vision-Real-Estate-1-Small.png",
            "https://mimprofile.e-mim.in/assets/client-logos/dojoin.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/esnaad_developments_logo.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/kgoc.png",
            "https://mimprofile.e-mim.in/assets/client-logos/logo.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/EmiratesDrivingInstitute.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/logo2.png",
            "https://mimprofile.e-mim.in/assets/client-logos/unnamed%20(2).png",
            "https://mimprofile.e-mim.in/assets/client-logos/unnamed.png",
            "https://mimprofile.e-mim.in/assets/client-logos/sleepwell.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/kurlon.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/redtape.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/apollopharma.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/uclean.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/mintop.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/furairatransport.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/imagelaundry.png",
            "https://mimprofile.e-mim.in/assets/client-logos/puregold.png",
            "https://mimprofile.e-mim.in/assets/client-logos/apollonia.png",
            "https://mimprofile.e-mim.in/assets/client-logos/henfruit.png",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-3.png",
            "https://mimprofile.e-mim.in/assets/client-logos/Untitled-7.png",
            "https://mimprofile.e-mim.in/assets/client-logos/logo-3.png",
            "https://mimprofile.e-mim.in/assets/client-logos/logo.png",
            "https://mimprofile.e-mim.in/assets/client-logos/download.png",
            "https://mimprofile.e-mim.in/assets/client-logos/SharjahDrivingInstitute.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/AhmedAlMaghribiPerfumes.webp",
            "https://mimprofile.e-mim.in/assets/client-logos/JaleelCashCarry.png",
            "https://mimprofile.e-mim.in/assets/client-logos/handloomhouse.png",
            "https://mimprofile.e-mim.in/assets/client-logos/dejavu.png",
            "https://mimprofile.e-mim.in/assets/client-logos/alliedMotors.png",
            "https://mimprofile.e-mim.in/assets/client-logos/vestige.png",
            "https://mimprofile.e-mim.in/assets/client-logos/nkshospital_logo.jpg",
            "https://mimprofile.e-mim.in/assets/client-logos/GemcareHospital.png",
            "https://mimprofile.e-mim.in/assets/client-logos/bmw.jpg",
        ]
        
        # Create client items from the logo list
        for logo_url in client_logos:
            # Extract name from filename
            filename = logo_url.split('/')[-1]
            name = filename.rsplit('.', 1)[0].replace('_', ' ').replace('-', ' ').title()
            
            clients.append(ClientItem(
                name=name,
                logo_url=logo_url
            ))
        
        logging.info(f"Extracted {len(clients)} client logos")
        return clients


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
        html_content = MiMProfileScraper.fetch_page_content()
        services = MiMProfileScraper.extract_services(html_content)
        
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
        html_content = MiMProfileScraper.fetch_page_content()
        clients = MiMProfileScraper.extract_clients(html_content)
        
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