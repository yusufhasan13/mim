"""
My Inbox Media® - Complete Backend API Server
Multi-page corporate website with admin panel
"""
from fastapi import FastAPI, APIRouter, HTTPException, status, Depends, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, timedelta
import requests
from bs4 import BeautifulSoup
from bson import ObjectId

# Import local modules
from models import (
    BlogPost, BlogPostCreate, BlogPostUpdate,
    Testimonial, TestimonialCreate, TestimonialUpdate,
    CaseStudy, CaseStudyCreate, CaseStudyUpdate,
    ContactMessage, serialize_doc,
    AdminUser, AdminUserCreate
)
from auth import (
    Token, UserLogin, UserInDB,
    verify_password, get_password_hash, create_access_token,
    get_current_user
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db_name = os.environ['DB_NAME']
db = client[db_name]

# Create the main app
app = FastAPI(title="My Inbox Media® API", version="1.0.0")

# Create router with /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ============= EXTERNAL DATA SCRAPER =============
class MIMProfileScraper:
    """Scraper for fetching services and clients from mimprofile.e-mim.in"""
    
    BASE_URL = "https://mimprofile.e-mim.in"
    TIMEOUT = 15
    MAX_RETRIES = 2
    
    @staticmethod
    def fetch_page_content() -> str:
        """Fetch the HTML content with retry logic"""
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        for attempt in range(MIMProfileScraper.MAX_RETRIES):
            try:
                response = requests.get(
                    MIMProfileScraper.BASE_URL, 
                    headers=headers, 
                    timeout=MIMProfileScraper.TIMEOUT
                )
                response.raise_for_status()
                return response.text
            except requests.Timeout:
                if attempt < MIMProfileScraper.MAX_RETRIES - 1:
                    logger.warning(f"Timeout on attempt {attempt + 1}, retrying...")
                    continue
                else:
                    raise HTTPException(
                        status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                        detail="External data source is not responding"
                    )
            except requests.RequestException as e:
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail=f"Unable to fetch external data: {str(e)}"
                )
    
    @staticmethod
    def extract_services(html_content: str) -> List[dict]:
        """Extract services information"""
        services_data = [
            {
                "title": "Omni Channel Solutions",
                "description": "30+ Billion messages per annum across SMS, WhatsApp, RCS, OBD, and Gamification with 99.9% delivery rate",
                "icon": "https://img.icons8.com/3d-fluency/200/communication.png",
                "features": [
                    "Bulk SMS & WhatsApp API Integration with real-time analytics",
                    "Rich Media Messaging (Images, PDFs, Videos) across channels",
                    "Trackable Links with CTR Analytics and conversion tracking",
                    "OTP Generation & Token Systems with high security",
                    "Delivery Status Webhooks for real-time updates",
                    "Gamification & OBD Automation for enhanced engagement"
                ]
            },
            {
                "title": "SMS Solutions",
                "description": "30+ Billion SMS per annum with cutting-edge features and global reach",
                "icon": "https://img.icons8.com/3d-fluency/200/sms.png",
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
                "description": "Enhanced engagement with 50M+ messages annually and verified business accounts",
                "icon": "https://img.icons8.com/3d-fluency/200/whatsapp.png",
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
                "title": "VOCAL BOX",
                "description": "All-in-one voice communication platform with IVR, OBD, Toll-Free, and Missed Call solutions",
                "icon": "https://img.icons8.com/3d-fluency/200/microphone.png",
                "features": [
                    "Interactive Voice Response (IVR) Systems",
                    "Outbound Dialing (OBD) for campaigns",
                    "Toll-Free Number Services with nationwide coverage",
                    "Missed Call Solutions for lead generation",
                    "Voice Broadcasting with scheduling",
                    "Call Analytics & Detailed Reporting",
                    "Multi-language Support",
                    "Custom Voice Prompts & Recording"
                ]
            },
            {
                "title": "Email Services",
                "description": "20+ Billion emails annually with enterprise-grade deliverability and infrastructure",
                "icon": "https://img.icons8.com/3d-fluency/200/email.png",
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
                "description": "Next-generation messaging with rich content and interactive features for modern engagement",
                "icon": "https://img.icons8.com/3d-fluency/200/chat.png",
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
                "description": "AI-powered customer service automation with intelligent conversational capabilities",
                "icon": "https://img.icons8.com/3d-fluency/200/bot.png",
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
                "description": "Seamless integration with enterprise systems and third-party platforms",
                "icon": "https://img.icons8.com/3d-fluency/200/api-settings.png",
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
                "description": "Engage customers with interactive experiences, loyalty programs, and reward systems",
                "icon": "https://img.icons8.com/3d-fluency/200/controller.png",
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
                "description": "Drive customer retention and engagement with digital loyalty solutions",
                "icon": "https://img.icons8.com/3d-fluency/200/qr-code.png",
                "features": [
                    "QR Code Generation",
                    "Digital Loyalty Cards",
                    "Points Management",
                    "Reward Redemption",
                    "Customer Analytics",
                    "Mobile Integration"
                ]
            },
            {
                "title": "Outdoor/Interactive LED",
                "description": "High-impact digital signage solutions with LED screens and interactive displays for maximum visibility",
                "icon": "https://img.icons8.com/3d-fluency/200/tv.png",
                "features": [
                    "Large Format LED Displays & Video Walls",
                    "Interactive Touch Screen Signage",
                    "Indoor & Outdoor LED Solutions",
                    "Dynamic Content Management System",
                    "Real-time Content Updates & Scheduling",
                    "Weather & Traffic-resistant Outdoor Screens",
                    "Energy-efficient LED Technology",
                    "Remote Monitoring & Control"
                ]
            },
            {
                "title": "Software Solutions",
                "description": "Custom enterprise software development including CRM, DMS, Loyalty Programs, and tailored business applications",
                "icon": "https://img.icons8.com/3d-fluency/200/software.png",
                "features": [
                    "CRM (Customer Relationship Management) Systems",
                    "DMS (Document Management Systems)",
                    "Loyalty Program Software",
                    "Customized Business Applications",
                    "Cloud-based Solutions",
                    "Mobile App Development",
                    "System Integration Services",
                    "Ongoing Support & Maintenance"
                ]
            }
        ]
        
        return services_data
    
    @staticmethod
    def extract_clients(html_content: str) -> List[dict]:
        """Extract client logos"""
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
        
        clients = []
        for logo_url in client_logos:
            filename = logo_url.split('/')[-1]
            name = filename.rsplit('.', 1)[0].replace('_', ' ').replace('-', ' ').title()
            clients.append({"name": name, "logo_url": logo_url})
        
        return clients


# ============= HELPER FUNCTIONS =============
def create_slug(title: str) -> str:
    """Create URL-friendly slug from title"""
    import re
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    return slug


# ============= PUBLIC ENDPOINTS =============

@api_router.get("/")
async def root():
    return {
        "message": "My Inbox Media® API",
        "version": "1.0.0",
        "status": "operational"
    }


@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
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


# ============= EXTERNAL DATA ENDPOINTS =============

@api_router.get("/external/services")
async def get_external_services():
    """Fetch services data from external source"""
    try:
        # Services are predefined, no need to fetch HTML
        services = MIMProfileScraper.extract_services("")
        
        return {
            "success": True,
            "data_count": len(services),
            "data": services,
            "source": "mimprofile.e-mim.in"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error extracting services: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to extract services: {str(e)}"
        )


@api_router.get("/external/clients")
async def get_external_clients():
    """Fetch client logos from external source"""
    try:
        # Clients are predefined, no need to fetch HTML
        clients = MIMProfileScraper.extract_clients("")
        
        return {
            "success": True,
            "data_count": len(clients),
            "data": clients,
            "source": "mimprofile.e-mim.in"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error extracting clients: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to extract clients: {str(e)}"
        )


# ============= CONTACT FORM =============

@api_router.post("/contact")
async def submit_contact_form(contact_data: ContactMessage):
    """Submit contact form"""
    try:
        contact_doc = contact_data.dict()
        result = await db.contacts.insert_one(contact_doc)
        contact_id = str(result.inserted_id)
        
        logger.info(f"Contact form submitted: {contact_id}")
        
        # TODO: Send email notification
        
        return {
            "success": True,
            "message": "Thank you for contacting us! We will get back to you soon.",
            "contact_id": contact_id
        }
        
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit contact form: {str(e)}"
        )


# ============= AUTHENTICATION =============

@api_router.post("/auth/login", response_model=Token)
async def login(user_login: UserLogin):
    """Login and get access token"""
    try:
        # Find user
        user_doc = await db.admin_users.find_one({"email": user_login.email})
        if not user_doc:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
        
        # Verify password
        if not verify_password(user_login.password, user_doc["hashed_password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
        
        # Create access token
        access_token_expires = timedelta(minutes=1440)  # 24 hours
        access_token = create_access_token(
            data={"sub": user_login.email}, expires_delta=access_token_expires
        )
        
        return {"access_token": access_token, "token_type": "bearer"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed"
        )


@api_router.post("/auth/register")
async def register_admin(user_create: AdminUserCreate):
    """Register new admin user (for setup only)"""
    try:
        # Check if user already exists
        existing_user = await db.admin_users.find_one({"email": user_create.email})
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User already exists"
            )
        
        # Create user
        hashed_password = get_password_hash(user_create.password)
        user_doc = {
            "email": user_create.email,
            "name": user_create.name,
            "hashed_password": hashed_password,
            "role": "admin",
            "created_at": datetime.utcnow()
        }
        
        result = await db.admin_users.insert_one(user_doc)
        
        return {
            "success": True,
            "message": "Admin user created successfully",
            "user_id": str(result.inserted_id)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration failed"
        )


@api_router.get("/auth/me")
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current user information"""
    try:
        user_doc = await db.admin_users.find_one(
            {"email": current_user["email"]},
            {"hashed_password": 0}
        )
        
        if not user_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        return serialize_doc(user_doc)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get user error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get user info"
        )


# ============= BLOG POSTS (PUBLIC) =============

@api_router.get("/blog")
async def get_blog_posts(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    category: Optional[str] = None,
    published_only: bool = True
):
    """Get paginated blog posts"""
    try:
        query = {}
        if published_only:
            query["published"] = True
        if category:
            query["category"] = category
        
        skip = (page - 1) * limit
        
        # Get total count
        total = await db.blog_posts.count_documents(query)
        
        # Get posts
        cursor = db.blog_posts.find(
            query,
            {"_id": 1, "title": 1, "slug": 1, "excerpt": 1, "author": 1, 
             "featured_image": 1, "category": 1, "tags": 1, "published": 1, 
             "views": 1, "created_at": 1, "updated_at": 1}
        ).sort("created_at", -1).skip(skip).limit(limit)
        posts = await cursor.to_list(length=limit)
        
        return {
            "success": True,
            "data": [serialize_doc(post) for post in posts],
            "total": total,
            "page": page,
            "limit": limit,
            "pages": (total + limit - 1) // limit
        }
        
    except Exception as e:
        logger.error(f"Error fetching blog posts: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch blog posts"
        )


@api_router.get("/blog/{slug}")
async def get_blog_post(slug: str):
    """Get single blog post by slug"""
    try:
        post = await db.blog_posts.find_one({"slug": slug})
        if not post:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Blog post not found"
            )
        
        # Increment views
        await db.blog_posts.update_one(
            {"slug": slug},
            {"$inc": {"views": 1}}
        )
        
        return serialize_doc(post)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching blog post: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch blog post"
        )


# ============= TESTIMONIALS (PUBLIC) =============

@api_router.get("/testimonials")
async def get_testimonials(
    published_only: bool = True,
    featured_only: bool = False
):
    """Get all testimonials"""
    try:
        query = {}
        if published_only:
            query["published"] = True
        if featured_only:
            query["featured"] = True
        
        cursor = db.testimonials.find(
            query,
            {"_id": 1, "client_name": 1, "client_position": 1, "client_company": 1,
             "client_image": 1, "testimonial_text": 1, "rating": 1, "featured": 1,
             "published": 1, "created_at": 1}
        ).sort("created_at", -1).limit(100)
        testimonials = await cursor.to_list(length=100)
        
        return {
            "success": True,
            "data": [serialize_doc(test) for test in testimonials]
        }
        
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch testimonials"
        )


# ============= CASE STUDIES (PUBLIC) =============

@api_router.get("/case-studies")
async def get_case_studies(
    published_only: bool = True,
    industry: Optional[str] = None
):
    """Get all case studies"""
    try:
        query = {}
        if published_only:
            query["published"] = True
        if industry:
            query["industry"] = industry
        
        cursor = db.case_studies.find(
            query,
            {"_id": 1, "title": 1, "slug": 1, "client_name": 1, "client_logo": 1,
             "industry": 1, "challenge": 1, "solution": 1, "results": 1,
             "technologies": 1, "featured_image": 1, "gallery_images": 1,
             "published": 1, "created_at": 1, "updated_at": 1}
        ).sort("created_at", -1).limit(100)
        case_studies = await cursor.to_list(length=100)
        
        return {
            "success": True,
            "data": [serialize_doc(cs) for cs in case_studies]
        }
        
    except Exception as e:
        logger.error(f"Error fetching case studies: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch case studies"
        )


@api_router.get("/case-studies/{slug}")
async def get_case_study(slug: str):
    """Get single case study by slug"""
    try:
        case_study = await db.case_studies.find_one({"slug": slug})
        if not case_study:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Case study not found"
            )
        
        return serialize_doc(case_study)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching case study: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch case study"
        )


# ============= ADMIN: BLOG POSTS =============

@api_router.post("/admin/blog", dependencies=[Depends(get_current_user)])
async def create_blog_post(post_data: BlogPostCreate):
    """Create new blog post (Admin only)"""
    try:
        post_dict = post_data.dict()
        post_dict["slug"] = create_slug(post_data.title)
        post_dict["created_at"] = datetime.utcnow()
        post_dict["updated_at"] = datetime.utcnow()
        post_dict["views"] = 0
        
        result = await db.blog_posts.insert_one(post_dict)
        
        return {
            "success": True,
            "message": "Blog post created",
            "post_id": str(result.inserted_id)
        }
        
    except Exception as e:
        logger.error(f"Error creating blog post: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create blog post"
        )


@api_router.put("/admin/blog/{post_id}", dependencies=[Depends(get_current_user)])
async def update_blog_post(post_id: str, post_data: BlogPostUpdate):
    """Update blog post (Admin only)"""
    try:
        update_dict = {k: v for k, v in post_data.dict().items() if v is not None}
        if not update_dict:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No fields to update"
            )
        
        update_dict["updated_at"] = datetime.utcnow()
        
        if "title" in update_dict:
            update_dict["slug"] = create_slug(update_dict["title"])
        
        result = await db.blog_posts.update_one(
            {"_id": ObjectId(post_id)},
            {"$set": update_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Blog post not found"
            )
        
        return {"success": True, "message": "Blog post updated"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating blog post: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update blog post"
        )


@api_router.delete("/admin/blog/{post_id}", dependencies=[Depends(get_current_user)])
async def delete_blog_post(post_id: str):
    """Delete blog post (Admin only)"""
    try:
        result = await db.blog_posts.delete_one({"_id": ObjectId(post_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Blog post not found"
            )
        
        return {"success": True, "message": "Blog post deleted"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting blog post: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete blog post"
        )


# ============= ADMIN: TESTIMONIALS =============

@api_router.post("/admin/testimonials", dependencies=[Depends(get_current_user)])
async def create_testimonial(testimonial_data: TestimonialCreate):
    """Create new testimonial (Admin only)"""
    try:
        testimonial_dict = testimonial_data.dict()
        testimonial_dict["created_at"] = datetime.utcnow()
        
        result = await db.testimonials.insert_one(testimonial_dict)
        
        return {
            "success": True,
            "message": "Testimonial created",
            "testimonial_id": str(result.inserted_id)
        }
        
    except Exception as e:
        logger.error(f"Error creating testimonial: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create testimonial"
        )


@api_router.put("/admin/testimonials/{testimonial_id}", dependencies=[Depends(get_current_user)])
async def update_testimonial(testimonial_id: str, testimonial_data: TestimonialUpdate):
    """Update testimonial (Admin only)"""
    try:
        update_dict = {k: v for k, v in testimonial_data.dict().items() if v is not None}
        if not update_dict:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No fields to update"
            )
        
        result = await db.testimonials.update_one(
            {"_id": ObjectId(testimonial_id)},
            {"$set": update_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Testimonial not found"
            )
        
        return {"success": True, "message": "Testimonial updated"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating testimonial: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update testimonial"
        )


@api_router.delete("/admin/testimonials/{testimonial_id}", dependencies=[Depends(get_current_user)])
async def delete_testimonial(testimonial_id: str):
    """Delete testimonial (Admin only)"""
    try:
        result = await db.testimonials.delete_one({"_id": ObjectId(testimonial_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Testimonial not found"
            )
        
        return {"success": True, "message": "Testimonial deleted"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting testimonial: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete testimonial"
        )


# ============= ADMIN: CASE STUDIES =============

@api_router.post("/admin/case-studies", dependencies=[Depends(get_current_user)])
async def create_case_study(case_study_data: CaseStudyCreate):
    """Create new case study (Admin only)"""
    try:
        case_study_dict = case_study_data.dict()
        case_study_dict["slug"] = create_slug(case_study_data.title)
        case_study_dict["created_at"] = datetime.utcnow()
        case_study_dict["updated_at"] = datetime.utcnow()
        
        result = await db.case_studies.insert_one(case_study_dict)
        
        return {
            "success": True,
            "message": "Case study created",
            "case_study_id": str(result.inserted_id)
        }
        
    except Exception as e:
        logger.error(f"Error creating case study: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create case study"
        )


@api_router.put("/admin/case-studies/{case_study_id}", dependencies=[Depends(get_current_user)])
async def update_case_study(case_study_id: str, case_study_data: CaseStudyUpdate):
    """Update case study (Admin only)"""
    try:
        update_dict = {k: v for k, v in case_study_data.dict().items() if v is not None}
        if not update_dict:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No fields to update"
            )
        
        update_dict["updated_at"] = datetime.utcnow()
        
        if "title" in update_dict:
            update_dict["slug"] = create_slug(update_dict["title"])
        
        result = await db.case_studies.update_one(
            {"_id": ObjectId(case_study_id)},
            {"$set": update_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Case study not found"
            )
        
        return {"success": True, "message": "Case study updated"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating case study: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update case study"
        )


@api_router.delete("/admin/case-studies/{case_study_id}", dependencies=[Depends(get_current_user)])
async def delete_case_study(case_study_id: str):
    """Delete case study (Admin only)"""
    try:
        result = await db.case_studies.delete_one({"_id": ObjectId(case_study_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Case study not found"
            )
        
        return {"success": True, "message": "Case study deleted"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting case study: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete case study"
        )


# ============= ADMIN: CONTACTS =============

@api_router.get("/admin/contacts", dependencies=[Depends(get_current_user)])
async def get_all_contacts(
    status_filter: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    """Get all contact messages (Admin only)"""
    try:
        query = {}
        if status_filter:
            query["status"] = status_filter
        
        skip = (page - 1) * limit
        
        total = await db.contacts.count_documents(query)
        cursor = db.contacts.find(query).sort("submitted_at", -1).skip(skip).limit(limit)
        contacts = await cursor.to_list(length=limit)
        
        return {
            "success": True,
            "data": [serialize_doc(contact) for contact in contacts],
            "total": total,
            "page": page,
            "limit": limit,
            "pages": (total + limit - 1) // limit
        }
        
    except Exception as e:
        logger.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch contacts"
        )


@api_router.patch("/admin/contacts/{contact_id}/status", dependencies=[Depends(get_current_user)])
async def update_contact_status(contact_id: str, status_value: str):
    """Update contact message status (Admin only)"""
    try:
        result = await db.contacts.update_one(
            {"_id": ObjectId(contact_id)},
            {"$set": {"status": status_value}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact not found"
            )
        
        return {"success": True, "message": "Contact status updated"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating contact status: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update contact status"
        )


# Include the router in the main app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
