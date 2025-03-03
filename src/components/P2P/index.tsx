'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Home,
  MessageCircle,
  Bitcoin,
  FileText,
  CheckCircle2,
  DollarSignIcon,
  Loader,
  PhoneIcon,
  HelpCircle,
  HeadphonesIcon,
} from 'lucide-react';
import React from 'react';

import { ModalRanking } from '@/components/ModalRanking';
import { useRouter } from 'next/navigation';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { Spinner } from '@chakra-ui/react';
import { LoadingSpinner } from '../LoadingSpinner';

export default function P2PDetails({ data }: { data: any }) {
  const { address } = useBlockchain();
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'owner',
      text: 'Hello, welcome. Do you have any questions about the property?',
    },
    {
      sender: 'renter',
      text: 'Hello, yes. Is the kitchen fully equipped?',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'renter', text: newMessage.trim() }]);
      setNewMessage('');
    }
  };

  if (data?.property?.title === undefined) {
    return <LoadingSpinner />;
  }
  console.log(data, 'data');

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {address === data?.renter?.wallet ? 'Your Booking' : 'Your Trip'}
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{data.property?.title}</CardTitle>
                <CardDescription>{data.property?.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={data.property?.main_image}
                  alt="Apartamento"
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <p className="text-sm text-gray-600 mb-4">
                  {data.property?.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center">
                    <Home className="w-4 h-4 mr-1" />2 habitaciones, 1 baño
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    <DollarSignIcon className="w-4 h-4 mr-1" />
                    {data.amount} USDC
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Check in & Check out Details</CardTitle>
                <CardDescription>
                  {new Date(data?.entrance_date)?.toLocaleDateString()} -{' '}
                  {new Date(data?.departure_date)?.toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CardTitle>Payment Details</CardTitle>
                <br />

                <div className="space-y-2">
                  <Button
                    className="w-full  hover:bg-blue-200 text-black"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    Show Contract Details
                  </Button>
                </div>
              </CardContent>
            </Card>
            {/* Support */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HeadphonesIcon className="w-5 h-5 mr-2" />
                  Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <button
                    className="p-[3px] relative"
                    onClick={() => {
                      router.push(`/chat-support`);
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                    <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                      ¿Need Assistance?
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <Card className="mb-8">
              <CardHeader></CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-2">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Propietario"
                      />
                      <AvatarFallback>OP</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{data?.owner?.name}</p>
                      <p className="text-sm text-gray-600">Owner</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    {data?.owner?.verified ? 'Verified' : 'Unverified'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-2">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Inquilino"
                      />
                      <AvatarFallback>II</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{data?.renter?.name}</p>
                      <p className="text-sm text-gray-600">Renter</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    {data?.renter?.verified ? 'Verified' : 'Unverified'}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4 h-96 overflow-y-auto">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === 'owner'
                          ? 'justify-start'
                          : 'justify-end'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'owner'
                            ? 'bg-gray-100'
                            : 'bg-blue-100'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button onClick={sendMessage}>Enviar</Button>
                </div>
              </CardContent>
            </Card>
            <ModalRanking />
          </section>
        </div>
      </main>
    </div>
  );
}
