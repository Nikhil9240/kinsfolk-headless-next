"use client"; 
 
import "./services.css"; 
import Link from "next/link"; 
import Image from "next/image";
import { 
  Sparkles, 
  ArrowUpRight, 
  RefreshCw, 
  CircleDot, 
  Code2, 
  UsersRound,
  LucideIcon, 
} from "lucide-react"; 
 
type Service = { 
  number: string; 
  navTitle: string; 
  title: string; 
  description: string; 
  tags: string[]; 
  href: string; 
  Icon:  LucideIcon;
  image: string; 
}; 
 
const services: Service[] = [ 
  { 
    number: "01", 
    navTitle: "Advisory Services", 
    title: "Advisory Services", 
    description: 
      "Expert guidance to help you assess, plan, and strategize your digital transformation journey with clarity and confidence.", 
    tags: [ 
      "Strategy & Assessment", 
      "Digital Transformation", 
      "Technology Consulting", 
      "Roadmap Planning", 
    ], 
    href: "/services/advisory-services", 
    Icon: Sparkles, 
    image: "/images/services/advisory.png",
  }, 
  { 
    number: "02", 
    navTitle: "Implementation", 
    title: "Implementation", 
    description: 
      "End-to-end deployment of enterprise solutions with a focus on accuracy, speed, and seamless adoption.", 
    tags: [ 
      "Solution Deployment", 
      "Platform Integration", 
      "Configuration", 
      "Implementation Support", 
    ], 
    href: "/services/implementation", 
    Icon: ArrowUpRight, 
    image: "/images/services/implementation.png",
  }, 
  { 
    number: "03", 
    navTitle: "Migration & Upgrade", 
    title: "Migration & Upgrade", 
    description: 
      "Secure and efficient transition of platforms, data, and applications to newer, more powerful versions without disruption.", 
    tags: [ 
      "Platform Migration", 
      "Data Migration", 
      "Version Upgrade", 
      "Modernization", 
    ], 
    href: "/services/migration-upgrade", 
    Icon: RefreshCw, 
    image: "/images/services/Migration & Upgrade.png",
  }, 
  { 
    number: "04", 
    navTitle: "Managed Services", 
    title: "Managed Services", 
    description: 
      "Proactive, round-the-clock support to keep your systems optimized, stable, secure, and performing at their best.", 
    tags: [ 
      "24/7 Support", 
      "Monitoring", 
      "Incident Management", 
      "Performance Optimization", 
    ], 
    href: "/services/managed-services", 
    Icon: CircleDot, 
    image: "/images/services/managed services.png",
  }, 
  { 
    number: "05", 
    navTitle: "Custom Development", 
    title: "Custom Development", 
    description: 
      "Tailored solutions engineered to meet unique business needs, integrating seamlessly with your existing ecosystem.", 
    tags: [ 
      "Custom Applications", 
      "API Integration", 
      "Enterprise Development", 
      "Digital Solutions", 
    ], 
    href: "/services/custom-development", 
    Icon: Code2, 
    image: "/images/services/Custom Development.png",
  }, 
  { 
    number: "06", 
    navTitle: "Resource Augmentation", 
    title: "Resource Augmentation", 
    description: 
      "Access certified experts on a flexible Time & Material basis to meet evolving project demands, boost productivity, and deliver outcomes.", 
    tags: [ 
      "Certified Experts", 
      "Flexible Teams", 
      "Technical Resources", 
      "Project Support", 
    ], 
    href: "/services/resource-augmentation", 
    Icon: UsersRound, 
    image: "/images/services/Resource Augmentation.png",
  }, 
]; 
 
export default function Services() { 
  return ( 
    <section className="servicesSection"> 
      <div className="servicesContainer"> 
        <div className="servicesIntro"> 
          <span className="servicesEyebrow"> 
            <span>05</span> 
            OUR PROCESS 
          </span> 
 
          <h2>Six ways to work with us.</h2> 
 
          <p> 
            From strategy to execution, we bring the right expertise, 
            technology, and people together to move your business forward. 
          </p> 
 
          <nav className="servicesNavigation"> 
            {services.map((service) => ( 
              <a 
                  key={service.number} 
                  href={`#service-${service.number}`} 
              > 
                  <span>{service.number}</span> 
                  {service.navTitle} 
              </a> 
          ))} 
          </nav> 
        </div> 
 
        <div className="servicesCards"> 
          {services.map((service, index) => { 
            const Icon = service.Icon; 
 
            return ( 
              <article 
                id={`service-${service.number}`} 
                className={`serviceCard serviceCard${index + 1}`} 
                key={service.number} 
            > 
              <div className="serviceCardInner"> 
                  <div className="serviceContent"> 
                    <h3>{service.title}</h3> 
                    <p>{service.description}</p> 
 
                  <div className="serviceTags"> 
                    {service.tags.map((tag) => ( 
                      <span key={tag}> 
                        <Icon size={16} strokeWidth={2} /> 
                        {tag} 
                      </span> 
                    ))} 
                  </div> 
 
                  <Link 
                    href={service.href} 
                    className="serviceExploreBtn" 
                  > 
                    Explore Service 
                  </Link> 
                </div> 
 
                <div className="serviceImage"> 
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    width={500} 
                    height={400} 
                    priority={index === 0} 
                  /> 
                </div> 
              </div> 
            </article> 
          ); 
        })} 
        </div> 
      </div> 
    </section> 
  ); 
}