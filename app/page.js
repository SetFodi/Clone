"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import {
  Globe as IconGlobe,
  Shield,
  Zap,
  Server,
  Lock,
  Activity,
  Wifi,
  Layers,
  Cpu,
  Network,
  Database,
  Rocket,
  Compass,
} from "lucide-react";

/* -------------------------------------------------------------------
   Navigation Component (Fixed Top-Left)
------------------------------------------------------------------- */
const Navigation = () => (
  <nav className="fixed top-0 left-0 z-50 w-full bg-gray-950/80 backdrop-blur-md p-4">
    <div className="container mx-auto flex items-center justify-between">
      <div className="text-2xl font-bold text-white">Proxied</div>
      <ul className="flex space-x-6 text-white">
        <li>
          <a href="#faq" className="hover:text-blue-400">
            F.A.Q
          </a>
        </li>
        <li>
          <a href="#how-it-works" className="hover:text-blue-400">
            How It Works
          </a>
        </li>
        <li>
          <a href="#testimonials" className="hover:text-blue-400">
            Testimonials
          </a>
        </li>
        <li>
          <a href="#enterprise-infrastructure" className="hover:text-blue-400">
            Features
          </a>
        </li>
        <li>
          <a href="#cta" className="hover:text-blue-400">
            Contact
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

/* -------------------------------------------------------------------
   Gradient Background Component
------------------------------------------------------------------- */
const GradientBackground = () => (
  <motion.div
    className="absolute inset-0 z-[-1]"
    animate={{
      background: [
        "linear-gradient(45deg, #1e3a8a, #9333ea)",
        "linear-gradient(135deg, #9333ea, #1e3a8a)",
        "linear-gradient(225deg, #1e3a8a, #9333ea)",
        "linear-gradient(315deg, #9333ea, #1e3a8a)",
      ],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

/* -------------------------------------------------------------------
   Loading Animation Component
------------------------------------------------------------------- */
const LoadingAnimation = () => (
  <div className="flex items-center justify-center h-screen">
    <motion.div
      className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

/* -------------------------------------------------------------------
   Dynamic Network Visualization using SVG circles
------------------------------------------------------------------- */
const NetworkVisualization = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const generateNodes = () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 2,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        speed: Math.random() * 3 + 1,
      }));

    const generateConnections = (nodes) => {
      const connections = [];
      nodes.forEach((node, i) => {
        if (i < nodes.length - 1) {
          connections.push({
            id: `${node.id}-${nodes[i + 1].id}`,
            from: { x: node.x, y: node.y },
            to: { x: nodes[i + 1].x, y: nodes[i + 1].y },
          });
        }
      });
      return connections;
    };

    const newNodes = generateNodes();
    setNodes(newNodes);
    setConnections(generateConnections(newNodes));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="w-full h-full">
        {connections.map((conn) => (
          <motion.line
            key={conn.id}
            x1={`${conn.from.x}%`}
            y1={`${conn.from.y}%`}
            x2={`${conn.to.x}%`}
            y2={`${conn.to.y}%`}
            stroke="url(#lineGradient)"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill={node.color}
            fillOpacity={0.6}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: node.speed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

/* -------------------------------------------------------------------
   Animated Routing Paths using SVG polylines
------------------------------------------------------------------- */
const RoutingPathAnimation = () => {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const generatePaths = () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        points: [
          `${Math.random() * 100},${Math.random() * 100}`,
          `${Math.random() * 100},${Math.random() * 100}`,
          `${Math.random() * 100},${Math.random() * 100}`,
        ],
      }));
    setPaths(generatePaths());
  }, []);

  return (
    <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 100 100">
      {paths.map((path) => (
        <motion.polyline
          key={path.id}
          fill="none"
          stroke="#60A5FA"
          strokeWidth="0.3"
          points={path.points.join(" ")}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: [0, 0.5, 0],
            strokeDashoffset: [0, 100],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: path.id * 0.5,
          }}
        />
      ))}
    </svg>
  );
};

/* -------------------------------------------------------------------
   Fixed-position Animated Nodes (Background Dots)
------------------------------------------------------------------- */
const NetworkBackground = () => {
  const nodes = [
    { x: "10%", y: "20%", size: 12, color: "#60a5fa", delay: 0 },
    { x: "30%", y: "50%", size: 8, color: "#9333ea", delay: 0.5 },
    { x: "70%", y: "30%", size: 10, color: "#60a5fa", delay: 1 },
    { x: "90%", y: "70%", size: 6, color: "#9333ea", delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: node.size,
            height: node.size,
            backgroundColor: node.color,
            left: node.x,
            top: node.y,
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: node.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------
   Gradient Particle Trails Component
------------------------------------------------------------------- */
function ParticleNetwork() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 100 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
      trail: Array.from({ length: 10 }, () => ({
        x: Math.random() * 20 - 10,
        y: Math.random() * 20 - 10,
      })),
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
          style={{ left: p.left, top: p.top }}
          animate={{
            scale: [0.5, 1.2, 0.5],
            opacity: [0.3, 0.8, 0.3],
            x: p.trail.map((t) => t.x),
            y: p.trail.map((t) => t.y),
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------
   Faint Hexagon Pattern Overlay
------------------------------------------------------------------- */
const HexagonGrid = () => (
  <div className="absolute inset-0 opacity-10 z-0">
    <div className="honeycomb">
      {[...Array(200)].map((_, i) => (
        <div key={i} className="honeycomb-cell" />
      ))}
    </div>
  </div>
);

/* -------------------------------------------------------------------
   Floating Label Bubbles (e.g., Country Codes)
------------------------------------------------------------------- */
const CyberBubble = ({ label, position, color }) => (
  <motion.div
    className={`absolute ${color} w-16 h-16 flex items-center justify-center rounded-xl border-2 border-blue-400/30 backdrop-blur-sm`}
    style={position}
    animate={{
      y: ["0%", "-20%", "0%"],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
      {label}
    </span>
  </motion.div>
);

/* -------------------------------------------------------------------
   Cluster of Proxy Nodes (Visual Effect)
------------------------------------------------------------------- */
const ProxyCluster = () => {
  const [proxies, setProxies] = useState([]);
  useEffect(() => {
    const newProxies = Array.from({ length: 10 }).map(() => ({
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
    }));
    setProxies(newProxies);
  }, []);
  return (
    <div className="absolute inset-0 pointer-events-none">
      {proxies.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-500 rounded-full"
          style={{ left: p.x, top: p.y, width: "10px", height: "10px" }}
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------
   Enhanced Status Dashboard (Live Updating Stats)
------------------------------------------------------------------- */
const EnhancedStatusDashboard = () => {
  const [stats, setStats] = useState({
    activeProxies: 2926,
    activeCountries: 108,
    averageSpeed: 1062,
    securityScore: 100.0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        activeProxies: prev.activeProxies + Math.floor(Math.random() * 5),
        activeCountries: prev.activeCountries + Math.floor(Math.random() * 2),
        averageSpeed: prev.averageSpeed + Math.floor(Math.random() * 10),
        securityScore: Math.min(100, prev.securityScore + Math.random() * 0.1),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      label: "Active Proxies",
      value: stats.activeProxies.toLocaleString(),
      icon: <Layers className="w-6 h-6 text-blue-400" />,
    },
    {
      label: "Global Reach",
      value: `${stats.activeCountries} Countries`,
      icon: <IconGlobe className="w-6 h-6 text-green-400" />,
    },
    {
      label: "Average Speed",
      value: `${stats.averageSpeed} Mbps`,
      icon: <Rocket className="w-6 h-6 text-purple-400" />,
    },
    {
      label: "Security Score",
      value: `${stats.securityScore.toFixed(1)}%`,
      icon: <Shield className="w-6 h-6 text-red-400" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-blue-500/20 p-6">
      {statItems.map((stat, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center p-4 bg-gray-800/50 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          {stat.icon}
          <div className="text-xl font-bold text-blue-400 mt-2">
            {stat.value}
          </div>
          <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------
   Feature Card Component with Neon Glow & Hover Effects
------------------------------------------------------------------- */
const FeatureCard = ({ title, description, icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="group relative p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 neon-glow hover-glow"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <Icon className="w-12 h-12 text-blue-400 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-blue-100">{title}</h3>
    <p className="text-gray-400">{description}</p>
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
    />
  </motion.div>
);

/* -------------------------------------------------------------------
   Data Arrays
------------------------------------------------------------------- */
const screenshots = [
  {
    id: 1,
    title: "Browse Listings",
    description: "Access a global network of proxies with real-time availability.",
    placeholderText: "Accessing Proxy Network...",
    image: "/proxy1.png",
  },
  {
    id: 2,
    title: "Select Your Proxy",
    description: "Filter by location, carrier, and performance metrics.",
    placeholderText: "Optimizing Connection...",
    image: "/proxy2.png",
  },
  {
    id: 3,
    title: "Connect & Scale",
    description: "Instant activation with automated rotation and scaling.",
    placeholderText: "Establishing Secure Tunnel...",
    image: "/proxy3.png",
  },
];

const dashboardFeatures = [
  {
    title: "Global Network",
    description: "Access points in 190+ countries",
    icon: IconGlobe,
  },
  {
    title: "Enterprise Security",
    description: "Military-grade encryption",
    icon: Shield,
  },
  {
    title: "Ultra-Fast Speed",
    description: "Sub-100ms latency worldwide",
    icon: Zap,
  },
  {
    title: "Load Balancing",
    description: "Intelligent traffic distribution",
    icon: Server,
  },
  {
    title: "End-to-End Encryption",
    description: "Secure data transmission",
    icon: Lock,
  },
  {
    title: "Real-time Monitoring",
    description: "Advanced analytics dashboard",
    icon: Activity,
  },
];

const architectureFeatures = [
  {
    id: 1,
    title: "Ultra Fast",
    description: "Lightning proxy connections with minimal latency.",
    icon: "⚡",
  },
  {
    id: 2,
    title: "High Security",
    description: "Military-grade encryption and secure data routing.",
    icon: "🔒",
  },
  {
    id: 3,
    title: "Global Reach",
    description: "Access proxies from over 100 countries worldwide.",
    icon: "🌐",
  },
  {
    id: 4,
    title: "Smart Routing",
    description: "AI-powered routing for optimal performance.",
    icon: "🤖",
  },
];

const testimonials = [
  {
    id: 1,
    quote:
      "This proxy service transformed our online operations. Unmatched speed and reliability!",
    name: "Alice, CTO at TechCorp",
  },
  {
    id: 2,
    quote:
      "A game-changer in proxy infrastructure. The AI routing makes all the difference.",
    name: "Bob, CEO at GlobalNet",
  },
  {
    id: 3,
    quote: "Incredible performance and unbeatable security. Highly recommended!",
    name: "Carol, Security Lead at SafeWeb",
  },
];

const FAQSection = () => (
  <section id="faq" className="w-full py-32 bg-gray-800">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
          FAQ
        </h2>
      </motion.div>
      <div className="space-y-8">
        <div className="p-6 bg-gray-900 rounded-xl border border-blue-400/20 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-blue-400">
            What is a mobile proxy?
          </h3>
          <p className="text-gray-300 mt-2">
            A mobile proxy routes your internet traffic through a mobile device’s IP address provided by a cellular network (4G or 5G). This makes your activity appear as if it's coming from a mobile user, offering high anonymity and access to geo-restricted content.
          </p>
        </div>
        <div className="p-6 bg-gray-900 rounded-xl border border-blue-400/20 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-blue-400">
            How do I connect my purchased proxies?
          </h3>
          <p className="text-gray-300 mt-2">
            Proxy validity is clearly displayed in your dashboard. Typically, we offer weekly plans, but the exact duration may vary based on the plan you choose. You'll see a countdown (e.g., "7 days left") for each proxy in your account.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentStep((prev) => (prev + 1) % screenshots.length),
      4000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <main
      className="relative min-h-screen bg-gray-950 text-white overflow-x-hidden scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* NAVIGATION */}
      <Navigation />

      {/* BACKGROUND LAYERS */}
      <NetworkVisualization />
      <RoutingPathAnimation />
      <HexagonGrid />
      <ParticleNetwork />
      <NetworkBackground />
      <ProxyCluster />
      <CyberBubble
        label="US"
        position={{ right: "20%", top: "45%" }}
        color="bg-purple-900/30"
      />
      <CyberBubble
        label="JP"
        position={{ left: "35%", bottom: "20%" }}
        color="bg-indigo-900/30"
      />

      {/* HERO SECTION */}
      <section className="relative pt-24 min-h-screen flex flex-col items-center justify-center px-4">
        <GradientBackground />
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Proxied
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-6 text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto"
          >
            Empowering your online presence with secure, fast mobile proxies.
            Experience unparalleled speed, security, and global reach.
          </motion.p>
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 inline-block btn-primary"
          >
            Get Started
          </motion.a>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.5,
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="mt-12"
          >
            <svg
              className="w-8 h-8 mx-auto animate-bounce text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="relative w-full py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-3xl border border-blue-400/20 p-12 backdrop-blur-xl">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                Proxy Orchestration Engine
              </h2>
              <p className="text-gray-300 text-xl max-w-2xl mx-auto">
                Automated proxy management with intelligent traffic routing and real-time performance optimization.
              </p>
            </motion.div>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="space-y-12">
                {screenshots.map((step, index) => (
                  <Tilt key={step.id} tiltMaxAngleX={5} tiltMaxAngleY={5}>
                    <motion.div
                      className={`p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl backdrop-blur-sm transition-all ${
                        currentStep === index
                          ? "border border-blue-400/100 shadow-lg"
                          : "border border-blue-400/20"
                      } hover:border-blue-400/40`}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div
                        className={`text-2xl mb-4 font-mono ${
                          currentStep === index
                            ? "bg-blue-500 text-white px-2 rounded"
                            : "text-blue-400"
                        }`}
                      >
                        0{index + 1}
                      </div>
                      <h3 className="text-2xl font-semibold mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-300">{step.description}</p>
                    </motion.div>
                  </Tilt>
                ))}
              </div>
              <div className="lg:col-span-2 relative h-[600px]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-400/20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      className="absolute inset-0 p-8"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative h-full w-full bg-gray-900/50 rounded-xl overflow-hidden">
                        <Image
                          src={screenshots[currentStep].image}
                          alt={screenshots[currentStep].title}
                          width={700}
                          height={850}
                          className="object-contain"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent">
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="text-2xl font-mono text-blue-400 mb-4">
                              {screenshots[currentStep].placeholderText}
                            </div>
                            <div className="h-1 bg-blue-900/50 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3.8, ease: "linear" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENTERPRISE-GRADE INFRASTRUCTURE SECTION */}
      <section id="enterprise-infrastructure" className="w-full py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Enterprise-Grade Infrastructure
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dashboardFeatures.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* QUANTUM PROXY ARCHITECTURE SECTION */}
      <section id="features" className="w-full py-32 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              Quantum Proxy Architecture
            </h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Next-generation proxy infrastructure with self-healing networks and predictive routing algorithms.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {architectureFeatures.map((feature) => (
              <Tilt
                key={feature.id}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                className="transition-transform duration-300"
              >
                <motion.div
                  className="p-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border border-blue-400/20 backdrop-blur-sm flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: feature.id * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                  <div className="mt-6 h-[2px] bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="w-full py-32 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="p-6 bg-gray-900 rounded-xl border border-blue-400/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: testimonial.id * 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-300 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="text-blue-400 font-semibold">
                  - {testimonial.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection />

      {/* CALL-TO-ACTION (CTA) SECTION */}
      <section id="cta" className="w-full py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Ready to Supercharge Your Proxy Network?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Join the revolution and take your proxy infrastructure to the next level.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="inline-block btn-primary"
            >
              Get Started Now
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">Proxied</h3>
            <p className="text-gray-400">
              © {new Date().getFullYear()} Proxied. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-blue-400">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
