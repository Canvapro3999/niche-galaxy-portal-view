
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Building2, Users, Globe, Star, ArrowRight, Shield, Clock, TrendingUp } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    company: '' 
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', 'Sarah Johnson');
    localStorage.setItem('userCompany', 'Healthcare Staffing Solutions UK');
    navigate('/dashboard');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', registerForm.name);
    localStorage.setItem('userCompany', registerForm.company);
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Building2,
      title: "1M+ Healthcare Facilities",
      description: "Access comprehensive databases of hospitals, clinics, and care facilities across the UK"
    },
    {
      icon: Users,
      title: "Targeted Lead Generation",
      description: "Find decision-makers and contacts in your specific healthcare niche"
    },
    {
      icon: Globe,
      title: "Multi-Region Coverage",
      description: "Comprehensive coverage across England, Scotland, Wales, and Northern Ireland"
    },
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "All data sourced and processed in compliance with UK data protection laws"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Healthcare Staffing Solutions",
      text: "Niche Galaxy helped us increase our client base by 300% in just 6 months. The quality of leads is exceptional.",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "MedStaff Recruitment",
      text: "The targeted NHS hospital database was exactly what we needed. ROI was positive within the first month.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Niche Galaxy
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 dark:text-gray-300">
              Features
            </Button>
            <Button variant="ghost" className="text-gray-600 dark:text-gray-300">
              Pricing
            </Button>
            <Button variant="ghost" className="text-gray-600 dark:text-gray-300">
              Support
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Healthcare Lead
                </span>
                <br />
                Generation Platform
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Access verified contacts from 1M+ healthcare facilities across the UK. 
                Perfect for staffing agencies, medical suppliers, and healthcare service providers.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium">4.9/5 Customer Rating</span>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">300% Average ROI</span>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">7-Day Refund Guarantee</span>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auth Forms */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Create Account</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Welcome Back</h2>
                  <p className="text-gray-600 dark:text-gray-400">Sign in to access your lead dashboard</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="sarah@healthcarestaffing.co.uk"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Get Started</h2>
                  <p className="text-gray-600 dark:text-gray-400">Create your account to access premium leads</p>
                </div>
                
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Sarah Johnson"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      placeholder="Healthcare Staffing Solutions"
                      value={registerForm.company}
                      onChange={(e) => setRegisterForm({...registerForm, company: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email Address</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="sarah@healthcarestaffing.co.uk"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Create Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-12">Trusted by Healthcare Leaders</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.text}"</p>
                  <div className="text-left">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
