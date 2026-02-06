import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircleIcon } from "lucide-react";

interface SaranaCardProps {
    title: string;
    image?: string;
    estimasiBiaya: string;
    estimasiSasaran: {
        sd?: string;
        smp?: string;
        sma?: string;
    };
}

export function SaranaCard({ 
    title, 
    image = "/images/placeholder.svg", 
    estimasiBiaya,
    estimasiSasaran 
}: SaranaCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-64 w-full bg-gray-100">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
            
            <CardContent className="pt-6 pb-4">
                <div className="flex items-start gap-2 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                        {title}
                    </h3>
                </div>

                <div className="space-y-3">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Estimasi Biaya Program:</p>
                        <p className="text-lg font-semibold text-blue-600">
                            {estimasiBiaya}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600 mb-2">Estimasi Sasaran:</p>
                        <ul className="space-y-1 text-sm text-gray-700">
                            {estimasiSasaran.sd && (
                                <li>• {estimasiSasaran.sd}</li>
                            )}
                            {estimasiSasaran.smp && (
                                <li>• {estimasiSasaran.smp}</li>
                            )}
                            {estimasiSasaran.sma && (
                                <li>• {estimasiSasaran.sma}</li>
                            )}
                        </ul>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex gap-2 pt-0 pb-6">
                <Button variant="outline" className="flex-1 border-green-600 text-green-600 hover:bg-green-50">
                    <MessageCircleIcon className="w-5 h-5 mr-2" />
                    Grup Whatsapp
                </Button>
            </CardFooter>
        </Card>
    );
}