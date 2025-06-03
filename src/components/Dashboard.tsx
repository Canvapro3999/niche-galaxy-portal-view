
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Download, 
  ShoppingCart, 
  Eye, 
  Building2, 
  Users, 
  MapPin, 
  Calendar,
  RefreshCw,
  LogOut,
  Sun,
  Moon,
  Star,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

interface LeadBundle {
  id: string;
  title: string;
  description: string;
  industry: string;
  region: string;
  count: number;
  price: number;
  rating: number;
  lastUpdated: string;
  sampleSize: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState([
    {
      id: '1',
      bundleTitle: 'NHS Hospitals UK',
      purchaseDate: '2024-06-01',
      amount: 299,
      status: 'completed',
      downloadCount: 3
    }
  ]);

  const [leadBundles] = useState<LeadBundle[]>([
    {
      id: '1',
      title: '1,000 NHS Hospitals UK',
      description: 'Complete database of NHS hospitals across England, Scotland, Wales & Northern Ireland with decision-maker contacts',
      industry: 'Healthcare',
      region: 'UK',
      count: 1000,
      price: 299,
      rating: 4.9,
      lastUpdated: '2024-06-01',
      sampleSize: 50
    },
    {
      id: '2',
      title: 'Private Clinics UK',
      description: 'Comprehensive list of private healthcare clinics and medical centers with key personnel information',
      industry: 'Healthcare',
      region: 'UK',
      count: 2500,
      price: 449,
      rating: 4.8,
      lastUpdated: '2024-05-28',
      sampleSize: 75
    },
    {
      id: '3',
      title: 'Care Homes Database',
      description: 'Elderly care facilities and nursing homes across the UK with facility managers and procurement contacts',
      industry: 'Healthcare',
      region: 'UK',
      count: 3200,
      price: 399,
      rating: 4.7,
      lastUpdated: '2024-05-25',
      sampleSize: 100
    },
    {
      id: '4',
      title: 'Mental Health Services',
      description: 'Mental health trusts, community services, and private practice contacts nationwide',
      industry: 'Healthcare',
      region: 'UK',
      count: 850,
      price: 199,
      rating: 4.9,
      lastUpdated: '2024-06-02',
      sampleSize: 40
    }
  ]);

  const userName = localStorage.getItem('userName') || 'User';
  const userCompany = localStorage.getItem('userCompany') || 'Company';

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userCompany');
    navigate('/');
  };

  const handleDownloadSample = (bundle: LeadBundle) => {
    // Simulate CSV download
    const csvContent = `Name,Title,Company,Email,Phone,Location
John Smith,Procurement Manager,${bundle.title.split(' ')[0]} Hospital,j.smith@hospital.nhs.uk,+44 20 7946 0958,London
Sarah Wilson,Director of Operations,Medical Center Ltd,s.wilson@medcenter.co.uk,+44 161 123 4567,Manchester
David Brown,Head of Staffing,Healthcare Trust,d.brown@trust.nhs.uk,+44 113 987 6543,Leeds`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${bundle.title.replace(/\s+/g, '_')}_sample.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePurchase = (bundle: LeadBundle) => {
    navigate('/purchase', { state: { bundle } });
  };

  const filteredBundles = leadBundles.filter(bundle => {
    const matchesIndustry = !selectedIndustry || bundle.industry === selectedIndustry;
    const matchesRegion = !selectedRegion || bundle.region === selectedRegion;
    const matchesSearch = !searchTerm || 
      bundle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bundle.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesIndustry && matchesRegion && matchesSearch;
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Niche Galaxy
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {userName}</p>
                <p className="text-xs text-gray-500">{userCompany}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="leads">Lead Marketplace</TabsTrigger>
            <TabsTrigger value="history">Purchase History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="leads" className="space-y-6">
            {/* Search Interface */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Find Your Perfect Lead Database</span>
                </CardTitle>
                <CardDescription>
                  Filter through our premium healthcare contact databases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Industry</label>
                    <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Industries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Industries</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Region</label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Regions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Regions</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="England">England</SelectItem>
                        <SelectItem value="Scotland">Scotland</SelectItem>
                        <SelectItem value="Wales">Wales</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <Input
                      placeholder="Search databases..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lead Bundles */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBundles.map((bundle) => (
                <Card key={bundle.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{bundle.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{bundle.count.toLocaleString()} contacts</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{bundle.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">£{bundle.price}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{bundle.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Updated {bundle.lastUpdated}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{bundle.sampleSize} sample records</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDownloadSample(bundle)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Preview Sample
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => handlePurchase(bundle)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Purchase History</CardTitle>
                <CardDescription>Track your database purchases and downloads</CardDescription>
              </CardHeader>
              <CardContent>
                {purchaseHistory.length > 0 ? (
                  <div className="space-y-4">
                    {purchaseHistory.map((purchase) => (
                      <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <h4 className="font-medium">{purchase.bundleTitle}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Purchased: {purchase.purchaseDate}</span>
                            <span>Downloads: {purchase.downloadCount}</span>
                            <Badge variant={purchase.status === 'completed' ? 'default' : 'secondary'}>
                              {purchase.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold">£{purchase.amount}</span>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button size="sm" variant="destructive">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refund
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No purchases yet. Browse our lead databases to get started!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
