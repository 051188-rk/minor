"use client";
import Link from "next/link";
import { FaCheckCircle, FaGraduationCap, FaFileAlt, FaChartLine, FaArrowRight } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: <FaGraduationCap className="text-3xl mb-4 text-blue-500" />,
    title: "Smart Test Generation",
    description: "Automatically generate customized mock tests based on your study material."
  },
  {
    icon: <FaFileAlt className="text-3xl mb-4 text-green-500" />,
    title: "AI-Powered Evaluation",
    description: "Get instant, accurate evaluation of answer sheets with detailed feedback."
  },
  {
    icon: <FaChartLine className="text-3xl mb-4 text-purple-500" />,
    title: "Performance Analytics",
    description: "Track your progress with detailed performance reports and analytics."
  }
];

const AnimatedGradientText = ({ children }: { children: React.ReactNode }) => (
  <motion.span
    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
    initial={{ backgroundPosition: '0% 50%' }}
    animate={{ backgroundPosition: '100% 50%' }}
    transition={{
      duration: 8,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'linear',
    }}
  >
    {children}
  </motion.span>
);

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={targetRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-600 bg-blue-100 rounded-full"
            >
              🚀 AI-Powered Learning Platform
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Revolutionize Your <AnimatedGradientText>Study Experience</AnimatedGradientText>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Transform your study materials into interactive mock tests and get AI-powered evaluations instantly. 
              <span className="block mt-2 text-lg text-gray-500">
                The smart way to prepare for your exams.
              </span>
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link 
                href="/signup-student" 
                className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                <span>Get Started Free</span>
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/signup-evaluator" 
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold border-2 border-gray-200 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-white flex items-center justify-center gap-2"
              >
                <span>Join as Evaluator</span>
              </Link>
            </motion.div>

            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-gray-500 text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
              <div className="mt-8 flex items-center justify-center space-x-4 text-gray-400">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white border-2 border-white shadow-md"></div>
                  ))}
                </div>
                <span className="text-sm">Trusted by 10,000+ students worldwide</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating mockup */}
        <motion.div 
          className="hidden lg:block absolute -right-20 top-1/2 transform -translate-y-1/2 w-1/3 max-w-xl"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl opacity-20 blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="p-4 bg-gray-50 border-b border-gray-100 flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded-full"></div>
                    <div className="h-3 bg-gray-100 rounded-full w-5/6"></div>
                  </div>
                  <div className="h-8 bg-blue-100 rounded-lg mt-4"></div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 border border-gray-100">
                        <div className="h-2 bg-gray-200 rounded-full w-3/4 mb-2"></div>
                        <div className="h-1 bg-gray-100 rounded-full w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to ace your exams with confidence</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-100 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="mt-6">
                  <Link href="#" className="text-blue-600 font-medium text-sm flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                    Learn more <FaArrowRight className="ml-1 text-xs" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your study experience?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Join thousands of students who are already acing their exams with our platform.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/signup-student" 
                className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/signup-evaluator" 
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-white/10 flex items-center justify-center gap-2"
              >
                Contact Sales
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-2 text-blue-100 text-sm">
              <FaCheckCircle className="text-green-300" />
              <span>No credit card required • 14-day free trial • Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">MockTest Pro</h3>
              <p className="mb-4">The ultimate platform for students and educators to create, take, and evaluate mock tests with AI assistance.</p>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'Facebook'].map((social) => (
                  <Link key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                    {social}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Testimonials', 'FAQ'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Blog', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>© {new Date().getFullYear()} MockTest Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
