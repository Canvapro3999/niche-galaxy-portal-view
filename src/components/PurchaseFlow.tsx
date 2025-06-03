
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  CreditCard, 
  Lock, 
  CheckCircle, 
  Users, 
  Download,
  Calendar,
  Shield
} from 'lucide-react';

const PurchaseFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    postcode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const bundle = location.state?.bundle;

  if (!bundle) {
    navigate('/dashboard');
    return null;
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      
      // Add to purchase history (simulate)
      const newPurchase = {
        id: Date.now().toString(),
        bundleTitle: bundle.title,
        purchaseDate: new Date().toISOString().split('T')[0],
        amount: bundle.price,
        status: 'completed',
        downloadCount: 0
      };
      
      // In a real app, this would be saved to a backend
      console.log('Purchase completed:', newPurchase);
    }, 3000);
  };

  const handleDownloadFull = () => {
    // Simulate full database download
    const csvContent = `Name,Title,Company,Email,Phone,Location,Department,LinkedIn
John Smith,Procurement Manager,Royal London Hospital,j.smith@hospital.nhs.uk,+44 20 7946 0958,London,Procurement,linkedin.com/in/johnsmith
Sarah Wilson,Director of Operations,Manchester Medical Center,s.wilson@medcenter.co.uk,+44 161 123 4567,Manchester,Operations,linkedin.com/in/sarahwilson
David Brown,Head of Staffing,Leeds Healthcare Trust,d.brown@trust.nhs.uk,+44 113 987 6543,Leeds,HR,linkedin.com/in/davidbrown
Emma Taylor,Chief Procurement Officer,Birmingham Hospital,e.taylor@birmingham.nhs.uk,+44 121 456 7890,Birmingham,Procurement,linkedin.com/in/emmataylor
Michael Jones,Facilities Manager,Edinburgh Royal Infirmary,m.jones@edinburgh.nhs.uk,+44 131 234 5678,Edinburgh,Facilities,linkedin.com/in/michaeljones`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${bundle.title.replace(/\s+/g, '_')}_full_database.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Order Summary</h2>
              <p className="text-gray-600 dark:text-gray-400">Review your purchase details</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{bundle.title}</CardTitle>
                <CardDescription>{bundle.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>{bundle.count.toLocaleString()} contacts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-green-500" />
                    <span>Updated {bundle.lastUpdated}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-purple-500" />
                    <span>CSV & Excel formats</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-orange-500" />
                    <span>7-day refund guarantee</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">£{bundle.price}</span>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Instant access to full database</p>
                  <p>• GDPR compliant data</p>
                  <p>• 24/7 customer support</p>
                  <p>• 7-day money-back guarantee</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => navigate('/dashboard')} className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Marketplace
              </Button>
              <Button onClick={() => setStep(2)} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                Continue to Payment
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Secure Payment</h2>
              <p className="text-gray-600 dark:text-gray-400">Enter your payment details</p>
              <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                <Lock className="w-4 h-4" />
                <span>256-bit SSL encryption</span>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Payment Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      placeholder="John Smith"
                      value={paymentForm.cardholderName}
                      onChange={(e) => setPaymentForm({...paymentForm, cardholderName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentForm.cardNumber}
                      onChange={(e) => setPaymentForm({...paymentForm, cardNumber: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentForm.expiryDate}
                        onChange={(e) => setPaymentForm({...paymentForm, expiryDate: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentForm.cvv}
                        onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="billingAddress">Address</Label>
                    <Input
                      id="billingAddress"
                      placeholder="123 Business Street"
                      value={paymentForm.billingAddress}
                      onChange={(e) => setPaymentForm({...paymentForm, billingAddress: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="London"
                        value={paymentForm.city}
                        onChange={(e) => setPaymentForm({...paymentForm, city: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postcode">Postcode</Label>
                      <Input
                        id="postcode"
                        placeholder="SW1A 1AA"
                        value={paymentForm.postcode}
                        onChange={(e) => setPaymentForm({...paymentForm, postcode: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1" disabled={isProcessing}>
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600" 
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Pay £{bundle.price}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Your purchase of "{bundle.title}" has been completed successfully.
              </p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="text-left space-y-2">
                  <h3 className="font-semibold">What's next?</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Download your complete database below</li>
                    <li>• Access your purchase in the Purchase History tab</li>
                    <li>• Contact support if you need any assistance</li>
                    <li>• Remember: 7-day refund guarantee applies</li>
                  </ul>
                </div>

                <Separator />

                <div className="flex flex-col space-y-2">
                  <Button onClick={handleDownloadFull} className="w-full bg-gradient-to-r from-green-600 to-blue-600">
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Database ({bundle.count.toLocaleString()} contacts)
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/dashboard')} className="w-full">
                    Return to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <CreditCard className="w-3 h-3 text-white" />
              </div>
              <span className="font-semibold">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Step {step} of 3</span>
              <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}% Complete</span>
            </div>
            <Progress value={(step / 3) * 100} className="h-2" />
          </div>

          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default PurchaseFlow;
