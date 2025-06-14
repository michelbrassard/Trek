"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import QRCode from "./qrcode";
import { Check, Copy, Plus, QrCode, X } from "lucide-react";
import TonalButton from "../buttons/tonal-button";

interface TemporaryCoachCodeProps {
    id: string,
    createdAt: string,
    coachId: string
}

export default function Enroll() {
    const [data, setData] = useState<TemporaryCoachCodeProps[]>([]);
    const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
    const [isLinkCopied, setIsLinkCopied] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:3000/api/proxy/temporary_coach_codes", {
                withCredentials: true,
            });

            setData(response.data);
          } catch (error) {
            console.error("Failed to fetch data:", error);
            
          }
        };
    
        fetchData();
      }, []);

      const handleGenerateCode = async () => {
        try {
          const response = await axios.post("http://localhost:3000/api/proxy/temporary_coach_codes", {
              withCredentials: true,
          });
          if (response.status === 201) {
            setData((prevData) => [...prevData, response.data]);
          }
          
        } catch (error) {
          console.error("Failed to create new code:", error);
        }
      }

      const handleCopyLink = () => {
        navigator.clipboard.writeText(`http://localhost:3000/signup?enroll=${data[0].id}`);
        setIsLinkCopied(true);
        setTimeout(() => {
          setIsLinkCopied(false);
        }, 2000); 
      }

      const handleShowQRCode = () => {
        if (isQRCodeOpen) {
          setIsQRCodeOpen(false)
        }
        else {
          setIsQRCodeOpen(true)
        }
      }

      return (
        <div className="mb-4">
          {data && 
            <div>
                {data.map((item) => (
                    <div key={item.id} className="flex flex-row gap-2">
                      <div>
                        <TonalButton isPrimary = {true} onClick={handleCopyLink}>
                            {isLinkCopied ? 
                              <div className="flex items-center gap-2">
                                Registration Link Copied
                                <Check size={16}/>
                              </div> : 
                              
                              <div className="flex items-center gap-2">
                                Copy Registration Link
                                <Copy size={16}/>
                              </div>
                            }
                             
                        </TonalButton>
                      </div>
                      <div>
                        <TonalButton isSecondary = {true} className="flex items-center gap-2" onClick={handleShowQRCode}>
                          View QR Code <QrCode size={16}/>
                        </TonalButton>
                        {isQRCodeOpen && 
                        <div onClick={handleShowQRCode} className="backdrop-blur-md p-5 fixed inset-0 z-50 transition-all flex justify-center">
                          <div className="mt-10 flex flex-col">
                            <div className="text-neutral-800 dark:text-neutral-200 flex gap-2 cursor-pointer m-2 justify-end">
                              Close <X size={22}/>
                            </div>
                            <QRCode url={`http://localhost:3000/signup?enroll=${item.id}`} />
                          </div>
                        </div>}
                      </div>
                    </div>
                ))}
            </div>
          }
          {
            data.length === 0 && 
            <div className="my-2">
              <TonalButton isPrimary = {true} onClick={handleGenerateCode}>
                Generate code <Plus size={22}/>
              </TonalButton> 
            </div>
            
          }
          
        </div>
      );
}