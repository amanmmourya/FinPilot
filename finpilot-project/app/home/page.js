'use client'
import React, { useState, useEffect } from 'react'
import { TrendingUp, Shield, Brain, Users, ArrowRight, Star, CheckCircle, Play, Award, BarChart3, Zap, Globe } from 'lucide-react'
import Navbar from '@/components/navbar'

const HomePage = () => {
  const [isVisible, setIsVisible] = useState({})
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }))
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Investment Analyst",
      content: "FinPilot has revolutionized how I analyze market trends. The AI insights are incredibly accurate and have helped me make better investment decisions.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9b6ad49?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Financial Advisor",
      content: "The portfolio management features are outstanding. My clients love the clear visualizations and real-time updates.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Emma Rodriguez",
      role: "Day Trader",
      content: "Real-time market analysis and predictive insights have given me a significant edge in my trading strategies.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (<>
  <Navbar />
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: 'url(img/hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-purple-900/70" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              Trusted by 50,000+ investors worldwide
            </div>
          </div>
          
          <h1 className="text-white text-4xl md:text-7xl font-extrabold drop-shadow-2xl mb-8 leading-tight">
            Explore the Future of Finance with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
              FinPilot
            </span>
          </h1>
          
          <p className="text-white/90 text-lg md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">
            Your AI-powered assistant for smarter investing, real-time expense tracking, and personalized financial planning. 
            Join thousands who've transformed their financial future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl font-semibold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/25">
              <span className="relative z-10 flex items-center">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            
            <button className="flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-xl font-semibold rounded-full border border-white/30 transition-all duration-300 transform hover:scale-105">
              <Play className="w-5 h-5 mr-2" />
              Sign Up
            </button>
          </div>
          
          <div className="flex justify-center items-center space-x-8 text-white/80">
            <div className="text-center">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm">Active Users</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold">$2.5B+</div>
              <div className="text-sm">Assets Managed</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for Modern Finance Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how FinPilot's cutting-edge technology can revolutionize your financial strategy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Brain className="w-12 h-12 text-blue-600" />,
                title: "AI-Powered Insights",
                description: "Get personalized savings recommendations based on real-time data and advanced algorithms.",
                features: ["Real-time market analysis", "Predictive modeling", "Risk assessment"]
              },
              {
                icon: <Shield className="w-12 h-12 text-green-600" />,
                title: "Secure & Reliable",
                description: "Bank-grade security ensures your financial data and investments are always protected.",
                features: ["Bank-grade encryption", "Multi-factor authentication", "Regulatory compliance"]
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-purple-600" />,
                title: "Portfolio Management",
                description: "Intelligent portfolio optimization and rebalancing to maximize returns while minimizing risk exposure.",
                features: ["Auto-rebalancing", "Diversification analysis", "Performance tracking"]
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 ${
                  isVisible.features ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How FinPilot Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes with our simple, three-step process
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 items-center">
            {[
              {
                step: "01",
                title: "Connect Your Accounts",
                description: "Securely add your expenses and investment accounts to FinPilot for a comprehensive financial overview.",
                icon: <Globe className="w-8 h-8 text-blue-600" />
              },
              {
                step: "02",
                title: "Set Your Goals",
                description: "Define your financial objectives, risk tolerance, and investment timeline for personalized recommendations.",
                icon: <BarChart3 className="w-8 h-8 text-purple-600" />
              },
              {
                step: "03",
                title: "Manage your Wealth",
                description: "Receive AI-powered insights, automated rebalancing, and real-time suggestions to save your money.",
                icon: <Zap className="w-8 h-8 text-green-600" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-gray-700">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <ArrowRight className="w-8 h-8 text-gray-300 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of people who've transformed their financial future
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full mr-4 border-4 border-white/30"
                  />
                  <div>
                    <h4 className="text-xl font-bold">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-white/80">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-lg leading-relaxed mb-6">
                  "{testimonials[currentTestimonial].content}"
                </p>
                
                <div className="flex justify-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8">
            <Award className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Join over thousands of investors who trust FinPilot for smarter investing and financial planning.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-white text-blue-900 hover:bg-gray-100 text-xl font-semibold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105">
              <span className="relative z-10 flex items-center">
                Start Your Journey Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
              Schedule Demo
            </button>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-white/70 text-sm">
              Easily manage your investments with our intuitive dashboard, real-time alerts, and personalized recommendations.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default HomePage