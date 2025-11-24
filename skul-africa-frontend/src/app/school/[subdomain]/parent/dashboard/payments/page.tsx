'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

export default function ParentPaymentsPage() {
  const payments = [
    {
      id: 1,
      description: 'Term 1 Tuition Fee',
      amount: 50000,
      dueDate: '2024-01-15',
      status: 'paid',
      paidDate: '2024-01-10',
    },
    {
      id: 2,
      description: 'Term 2 Tuition Fee',
      amount: 50000,
      dueDate: '2024-04-15',
      status: 'paid',
      paidDate: '2024-04-12',
    },
    {
      id: 3,
      description: 'Term 3 Tuition Fee',
      amount: 50000,
      dueDate: '2024-07-15',
      status: 'pending',
      paidDate: null,
    },
    {
      id: 4,
      description: 'Transportation Fee',
      amount: 15000,
      dueDate: '2024-02-01',
      status: 'paid',
      paidDate: '2024-01-28',
    },
    {
      id: 5,
      description: 'Activity Fee',
      amount: 10000,
      dueDate: '2024-03-01',
      status: 'overdue',
      paidDate: null,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'overdue': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <AlertCircle className="h-5 w-5 text-neutral-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'overdue': return 'text-red-500';
      default: return 'text-neutral-400';
    }
  };

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Payment History</h1>
          <p className="text-neutral-400">Track your child's school fees and payments</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <CreditCard className="w-4 h-4 mr-2" />
          Make Payment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Total Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">₦{totalPaid.toLocaleString()}</div>
            <p className="text-xs text-neutral-400">This academic year</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">₦{totalPending.toLocaleString()}</div>
            <p className="text-xs text-neutral-400">Due soon</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">₦{totalOverdue.toLocaleString()}</div>
            <p className="text-xs text-neutral-400">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">Payment Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border border-neutral-800 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-neutral-800 rounded-full">
                    {getStatusIcon(payment.status)}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{payment.description}</h3>
                    <p className="text-neutral-400 text-sm">
                      Due: {new Date(payment.dueDate).toLocaleDateString()}
                      {payment.paidDate && ` • Paid: ${new Date(payment.paidDate).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-white font-medium">₦{payment.amount.toLocaleString()}</p>
                    <p className={`text-sm ${getStatusColor(payment.status)}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </p>
                  </div>
                  {payment.status !== 'paid' && (
                    <Button variant="outline" size="sm" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800">
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}