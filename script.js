// ============================================
// Theme Management (Dark/Light Mode)
// ============================================
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    modeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Toggle theme function
modeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    const icon = modeToggle.querySelector('i');
    if (newTheme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// ============================================
// Recruiter Mode Toggle
// ============================================
const recruiterToggle = document.getElementById('recruiter-toggle');
let recruiterMode = false;

recruiterToggle.addEventListener('click', () => {
    recruiterMode = !recruiterMode;
    body.setAttribute('data-mode', recruiterMode ? 'recruiter' : '');
    recruiterToggle.classList.toggle('active', recruiterMode);
    
    // Update content based on mode
    updateContentForRecruiterMode(recruiterMode);
});

function updateContentForRecruiterMode(isRecruiter) {
    const descriptions = document.querySelectorAll('.hero-description, .about-description, .project-description');
    
    descriptions.forEach(desc => {
        if (isRecruiter) {
            desc.dataset.original = desc.textContent;
            desc.textContent = getFormalDescription(desc);
        } else {
            if (desc.dataset.original) {
                desc.textContent = desc.dataset.original;
                delete desc.dataset.original;
            }
        }
    });
}

function getFormalDescription(element) {
    const classList = element.classList;
    if (classList.contains('hero-description')) {
        return "I am a dedicated Computer Science Engineering student with a strong foundation in software development principles. My academic journey has been complemented by hands-on experience in building scalable web applications and desktop solutions. I am seeking opportunities to contribute to innovative projects while continuing to expand my technical expertise.";
    } else if (classList.contains('about-description')) {
        return "As a Computer Science Engineering student, I have developed a comprehensive understanding of software engineering methodologies, data structures, algorithms, and system design. My project portfolio demonstrates proficiency in multiple programming languages and frameworks, with a focus on creating efficient, maintainable, and user-centric solutions. I am committed to continuous learning and professional growth in the software development industry.";
    } else if (classList.contains('project-description')) {
        const projectTitle = element.closest('.project-card').querySelector('.project-title').textContent;
        return getFormalProjectDescription(projectTitle);
    }
    return element.textContent;
}

function getFormalProjectDescription(title) {
    const descriptions = {
        'Smart Classroom Management System': 'This project demonstrates proficiency in Django framework and full-stack web development. The system implements a robust MVC architecture with secure authentication, database management, and RESTful API design. Key features include automated attendance tracking, grade management, and administrative dashboard with real-time analytics.',
        'Hotel Management System': 'A desktop application showcasing object-oriented programming principles and GUI development using Python and Tkinter. The system implements efficient data management with MySQL integration, featuring reservation management, billing automation, and comprehensive reporting capabilities.',
        'Bookstore Management System': 'This Java-based application exemplifies enterprise-level software development practices. Built using Swing framework, it demonstrates advanced OOP concepts, design patterns, and database connectivity. The system handles inventory management, sales processing, and customer relationship management with a scalable architecture.',
        'Blood Bank Management System': 'A full-stack web application demonstrating proficiency in front-end and back-end technologies. The system implements secure donor registration, inventory tracking, and request management with PHP server-side logic and responsive web design principles.'
    };
    return descriptions[title] || 'A comprehensive software solution demonstrating technical expertise and problem-solving capabilities.';
}

// ============================================
// Navigation Functionality
// ============================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveNavLink();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, #hero');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll Reveal Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements that need reveal animation
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.section-title, .skill-card, .project-card, .cert-card, .timeline-item');
    revealElements.forEach(el => observer.observe(el));
});

// ============================================
// Animated Counter for Stats
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.getAttribute('data-target'));
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// Skill Card Interactive Demos
// ============================================
const skillCards = document.querySelectorAll('.skill-card');
const skillModal = document.getElementById('skill-modal');
const skillModalBody = document.getElementById('skill-modal-body');

const skillDemos = {
    python: {
        title: 'Python Programming',
        description: 'Proficient in Python with experience in web development, data structures, and algorithms.',
        code: `# Example: Quick Sort Algorithm
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)`,
        features: ['Object-Oriented Programming', 'Data Structures', 'Web Frameworks', 'API Development']
    },
    java: {
        title: 'Java Development',
        description: 'Strong foundation in Java with expertise in Swing GUI and enterprise applications.',
        code: `// Example: Class Structure
public class Bookstore {
    private String name;
    private List<Book> inventory;
    
    public void addBook(Book book) {
        inventory.add(book);
    }
}`,
        features: ['Swing GUI', 'OOP Principles', 'Collections Framework', 'Exception Handling']
    },
    django: {
        title: 'Django Framework',
        description: 'Experience building scalable web applications with Django and REST APIs.',
        code: `# Example: Django View
from django.shortcuts import render
from .models import Student

def student_list(request):
    students = Student.objects.all()
    return render(request, 'students/list.html', 
                 {'students': students})`,
        features: ['MVC Architecture', 'ORM', 'Authentication', 'REST APIs']
    },
    html: {
        title: 'HTML/CSS',
        description: 'Creating responsive and modern user interfaces with semantic HTML and CSS.',
        code: `/* Example: Glassmorphism Effect */
.card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}`,
        features: ['Responsive Design', 'CSS Grid/Flexbox', 'Animations', 'Modern CSS']
    },
    javascript: {
        title: 'JavaScript',
        description: 'Building interactive web applications with vanilla JavaScript and modern ES6+ features.',
        code: `// Example: Async/Await
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}`,
        features: ['DOM Manipulation', 'Async Programming', 'Event Handling', 'ES6+ Features']
    },
    database: {
        title: 'Database Management',
        description: 'Designing and managing relational databases with SQL and ORM frameworks.',
        code: `-- Example: SQL Query
SELECT s.name, COUNT(e.id) as enrollments
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
GROUP BY s.id, s.name
ORDER BY enrollments DESC;`,
        features: ['SQL Queries', 'Database Design', 'ORM Integration', 'Data Modeling']
    }
};

skillCards.forEach(card => {
    card.addEventListener('click', () => {
        const skillType = card.getAttribute('data-skill');
        const demo = skillDemos[skillType];
        
        if (demo) {
            skillModalBody.innerHTML = `
                <h2>${demo.title}</h2>
                <p>${demo.description}</p>
                <div class="skill-demo-code">
                    <pre><code>${demo.code}</code></pre>
                </div>
                <div class="skill-features">
                    <h3>Key Features:</h3>
                    <ul>
                        ${demo.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            `;
            skillModal.classList.add('show');
        }
    });
});

// Close modal
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        skillModal.classList.remove('show');
        document.getElementById('architecture-modal').classList.remove('show');
    });
});

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});

// ============================================
// Project Architecture Visualizer
// ============================================
const architectureModal = document.getElementById('architecture-modal');
const architectureDiagram = document.getElementById('architecture-diagram');
const architectureTitle = document.getElementById('architecture-title');

const projectArchitectures = {
    classroom: {
        title: 'Smart Classroom Management System Architecture',
        layers: [
            { name: 'Frontend', components: ['HTML/CSS', 'JavaScript', 'Bootstrap'] },
            { name: 'Backend', components: ['Django Framework', 'Python', 'Views & URLs'] },
            { name: 'Business Logic', components: ['Models', 'Forms', 'Authentication'] },
            { name: 'Database', components: ['SQLite', 'ORM', 'Migrations'] }
        ]
    },
    hotel: {
        title: 'Hotel Management System Architecture',
        layers: [
            { name: 'Presentation Layer', components: ['Tkinter GUI', 'Widgets', 'Event Handlers'] },
            { name: 'Business Layer', components: ['Python Classes', 'Business Logic', 'Validation'] },
            { name: 'Data Access Layer', components: ['MySQL Connector', 'SQL Queries', 'Transactions'] },
            { name: 'Database', components: ['MySQL Server', 'Tables', 'Relations'] }
        ]
    },
    bookstore: {
        title: 'Bookstore Management System Architecture',
        layers: [
            { name: 'UI Layer', components: ['Java Swing', 'JFrame', 'Components'] },
            { name: 'Controller Layer', components: ['Action Listeners', 'Event Handling'] },
            { name: 'Service Layer', components: ['Business Logic', 'Data Validation'] },
            { name: 'DAO Layer', components: ['Database Connection', 'CRUD Operations'] },
            { name: 'Database', components: ['MySQL', 'JDBC', 'Tables'] }
        ]
    },
    bloodbank: {
        title: 'Blood Bank Management System Architecture',
        layers: [
            { name: 'Client Side', components: ['HTML5', 'CSS3', 'JavaScript'] },
            { name: 'Server Side', components: ['PHP', 'Session Management'] },
            { name: 'Application Logic', components: ['Business Rules', 'Validation', 'Processing'] },
            { name: 'Database', components: ['MySQL', 'Tables', 'Stored Procedures'] }
        ]
    }
};

document.querySelectorAll('.view-architecture').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectType = btn.getAttribute('data-project');
        const architecture = projectArchitectures[projectType];
        
        if (architecture) {
            architectureTitle.textContent = architecture.title;
            architectureDiagram.innerHTML = generateArchitectureDiagram(architecture.layers);
            architectureModal.classList.add('show');
        }
    });
});

function generateArchitectureDiagram(layers) {
    let html = '<div class="architecture-layers">';
    
    layers.forEach((layer, index) => {
        html += `
            <div class="architecture-layer" style="animation-delay: ${index * 0.2}s">
                <div class="layer-name">${layer.name}</div>
                <div class="layer-components">
                    ${layer.components.map(comp => `<span class="component">${comp}</span>`).join('')}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// Add styles for architecture diagram
const style = document.createElement('style');
style.textContent = `
    .architecture-layers {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    .architecture-layer {
        padding: 1.5rem;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 10px;
        opacity: 0;
        transform: translateX(-20px);
        animation: slideIn 0.5s ease forwards;
    }
    @keyframes slideIn {
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    .layer-name {
        font-weight: bold;
        color: var(--accent-primary);
        margin-bottom: 1rem;
        font-size: 1.1rem;
    }
    .layer-components {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    .component {
        padding: 0.5rem 1rem;
        background: var(--accent-primary);
        color: white;
        border-radius: 20px;
        font-size: 0.9rem;
    }
    .skill-demo-code {
        background: var(--bg-primary);
        padding: 1rem;
        border-radius: 10px;
        margin: 1rem 0;
        overflow-x: auto;
    }
    .skill-demo-code pre {
        margin: 0;
        color: var(--text-primary);
    }
    .skill-demo-code code {
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
    }
    .skill-features {
        margin-top: 1.5rem;
    }
    .skill-features h3 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }
    .skill-features ul {
        list-style: none;
        padding-left: 0;
    }
    .skill-features li {
        padding: 0.5rem 0;
        color: var(--text-secondary);
        position: relative;
        padding-left: 1.5rem;
    }
    .skill-features li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--accent-primary);
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// ============================================
// Portfolio Assistant Chatbot
// ============================================
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

// Chatbot knowledge base
const chatbotKnowledge = {
    skills: {
        keywords: ['skill', 'technology', 'programming', 'language', 'framework', 'expertise', 'proficient'],
        response: 'Priyanka has expertise in Python, Java, Django, HTML/CSS, JavaScript, and Database Management. She has built multiple projects using these technologies and continues to learn and improve her skills.'
    },
    projects: {
        keywords: ['project', 'work', 'application', 'system', 'built', 'developed', 'created'],
        response: 'Priyanka has developed several projects including: Smart Classroom Management System (Django), Hotel Management System (Python), Bookstore Management System (Java), and Blood Bank Management System (Web). Each project demonstrates different aspects of software development.'
    },
    experience: {
        keywords: ['experience', 'background', 'qualification', 'education', 'student', 'degree'],
        response: 'Priyanka is a Computer Science Engineering student with hands-on experience in software development. She has completed multiple projects and certifications, demonstrating practical application of programming concepts.'
    },
    contact: {
        keywords: ['contact', 'email', 'phone', 'reach', 'connect', 'linkedin', 'github'],
        response: 'You can contact Priyanka via email at priyanka@example.com, phone at +91 98765 43210, or connect on LinkedIn and GitHub. Check the contact section for more details.'
    },
    python: {
        keywords: ['python'],
        response: 'Priyanka is proficient in Python programming. She has used Python for web development with Django, desktop applications with Tkinter, and various data structures and algorithms. Her Hotel Management System was built using Python.'
    },
    java: {
        keywords: ['java'],
        response: 'Priyanka has strong Java skills, particularly in Swing GUI development and object-oriented programming. Her Bookstore Management System showcases her Java expertise with a complete desktop application.'
    },
    django: {
        keywords: ['django'],
        response: 'Priyanka has experience with Django framework for building web applications. Her Smart Classroom Management System demonstrates her Django skills, including models, views, templates, and authentication.'
    },
    default: {
        response: 'I can help you learn about Priyanka\'s skills, projects, experience, and contact information. Feel free to ask me anything!'
    }
};

chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('show');
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('show');
});

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getChatbotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check each knowledge category
    for (const [key, data] of Object.entries(chatbotKnowledge)) {
        if (key === 'default') continue;
        
        const hasKeyword = data.keywords.some(keyword => lowerMessage.includes(keyword));
        if (hasKeyword) {
            return data.response;
        }
    }
    
    return chatbotKnowledge.default.response;
}

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    addMessage(message, true);
    chatbotInput.value = '';
    
    // Simulate thinking delay
    setTimeout(() => {
        const response = getChatbotResponse(message);
        addMessage(response, false);
    }, 500);
}

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simulate form submission
    alert(`Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
    
    // Reset form
    contactForm.reset();
});

// ============================================
// Initialize on page load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Initial active nav link
    updateActiveNavLink();
    
    console.log('Portfolio website loaded successfully!');
});

