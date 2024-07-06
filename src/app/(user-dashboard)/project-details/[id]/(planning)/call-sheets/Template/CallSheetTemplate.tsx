import Image from 'next/image';
import { forwardRef } from 'react';
import Logo from './logo1.jpeg';

interface CallSheetTemplateProps {
    formData: any;
}

const CallSheetTemplate = forwardRef<HTMLDivElement, CallSheetTemplateProps>(({ formData }, ref) => {
    const { street, city, country, website, contact, producerName, producerContact, directorName, directorContact, productionManagerName, productionManagerContact, breakfast, lunch, sunrise, sunset, weather, nearestHospital, nearestPoliceStation, nearestFireStation, additionalDetails, title, callTime } = formData;

    // Generate the Google Maps Embed URL
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAnmHDoxexwRcNy63vKd-my62JA6Xy4L7M&q=${encodeURIComponent(street)},${encodeURIComponent(city)},${encodeURIComponent(country)}`;

    return (
        <div ref={ref} className="p-4 bg-white border-2" style={{ width: '210mm', height: '297mm', margin: 'auto' }}>
            <div className="flex justify-between mb-4">
                <div className="w-1/3 border p-2 text-sm">
                    <p>{street}</p>
                    <p>{city}</p>
                    <p>{country}</p>
                    <p>{website}</p>
                    <p>{contact}</p>
                    <table className="w-full border-collapse border text-xs mt-2">
                        <tbody>
                            <tr>
                                <td className="border px-2 py-1"><strong>Producer:</strong></td>
                                <td className="border px-2 py-1">{producerName}</td>
                                <td className="border px-2 py-1">{producerContact}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1"><strong>Director:</strong></td>
                                <td className="border px-2 py-1">{directorName}</td>
                                <td className="border px-2 py-1">{directorContact}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1"><strong>PM:</strong></td>
                                <td className="border px-2 py-1">{productionManagerName}</td>
                                <td className="border px-2 py-1">{productionManagerContact}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="w-1/5 text-center">
                    <Image src={Logo} alt="Logo" className="mx-auto -my-2 size-18" />
                    <h1 className="text-md font-normal mb-2">{title}</h1>
                    <p className="text-lg font-semibold border-2 border-black rounded-full">{callTime}</p>
                </div>
                <div className="w-1/3 border p-2">
                    <table className="w-full border-collapse border text-sm">
                        <tbody>
                            <tr>
                                <td className="border px-2 py-1"><strong>Breakfast:</strong></td>
                                <td className="border px-2 py-1">{breakfast}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1"><strong>Lunch:</strong></td>
                                <td className="border px-2 py-1">{lunch}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1"><strong>Sunrise:</strong></td>
                                <td className="border px-2 py-1">{sunrise}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1"><strong>Sunset:</strong></td>
                                <td className="border px-2 py-1">{sunset}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1"><strong>Weather:</strong></td>
                                <td className="border px-2 py-1">{weather}</td>
                            </tr>
                            <tr>
                                <td className="border px-2 py-1"><strong>Nearest Hospital:</strong></td>
                                <td className="px-2 py-1">{nearestHospital}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-between mb-4">
                <div className="w-1/2 border p-2 h-48">
                    <iframe
                        width="100%"
                        height="100%"
                        // frameBorder="1"
                        style={{ border: 0 }}
                        src={mapUrl}
                        allowFullScreen
                    />
                </div>

                <div className="w-1/2 border p-2 text-sm">
                    <p><strong>Additional Notes:</strong> {additionalDetails}</p>
                    <p><strong>Nearest Police Station:</strong> {nearestPoliceStation}</p>
                    <p><strong>Nearest Fire Station:</strong> {nearestFireStation}</p>
                </div>
            </div>
            <table className="w-full mb-4 border-collapse border text-xs">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">#</th>
                        <th className="border px-2 py-1">SCENES</th>
                        <th className="border px-2 py-1">SET AND DESCRIPTION</th>
                        <th className="border px-2 py-1">CHARACTER #</th>
                        <th className="border px-2 py-1">D/N</th>
                        <th className="border px-2 py-1">PAGES</th>
                        <th className="border px-2 py-1">LOCATION/NOTES</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td className="border px-2 py-1">1</td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                    </tr>
                    <tr>
                        <td className="border px-2 py-1">2</td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                    </tr>
                    <tr>
                        <td className="border px-2 py-1">3</td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                    </tr>
                    <tr>
                        <td className="border px-2 py-1">4</td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                    </tr>
                    <tr>
                        <td className="border px-2 py-1">5</td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                    </tr>
                </tbody>
            </table>
            {/* Cast and Call Times */}
            <table className="w-full mb-4 border-collapse border text-xs">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">#</th>
                        <th className="border px-2 py-1">CAST</th>
                        <th className="border px-2 py-1">CHARACTER</th>
                        <th className="border px-2 py-1">CALL TIME</th>
                        <th className="border px-2 py-1">SPECIAL INSTRUCTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Add rows as needed */}
                    <tr>
                        <td className="border px-2 py-1">1</td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                    </tr>
                    <tr>
                        <td className="border px-2 py-1">2</td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                    </tr>
                    <tr>
                        <td className="border px-2 py-1">3</td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                    </tr>
                    <tr>
                        <td className="border px-2 py-1">4</td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                    </tr>
                    <tr>
                        <td className="border px-2 py-1">5</td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                        <td className='border px-2 py-1'></td>
                    </tr>
                </tbody>
            </table>

            {/* Production Notes */}
            <table className="w-full mb-4 border-collapse border text-xs">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">PRODUCTION NOTES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='border px-2 py-5'></td>
                    </tr>
                    <tr>
                        <td className='border px-2 py-5'></td>
                    </tr>
                </tbody>
            </table>

            {/* Crew Contact Information */}
            <table className="w-full border-collapse border text-xs">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">POSITION</th>
                        <th className="border px-2 py-1">NAME</th>
                        <th className="border px-2 py-1">PHONE</th>
                        <th className="border px-2 py-1">EMAIL</th>
                        <th className="border px-2 py-1">CALL TIME</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Add rows as needed */}
                    <tr>
                        <td className="border px-2 py-1">Producer</td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                    </tr>
                    <tr>
                        <td className="border px-2 py-1">Director</td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                    </tr>
                    <tr>
                        <td className="border px-2 py-1">PM</td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                    </tr>
                    <tr>
                        <td className="border px-2 py-1">Dir. of Photography</td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                    </tr>
                    <tr>
                        <td className="border px-2 py-1">Camera OP</td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
});

export default CallSheetTemplate;
