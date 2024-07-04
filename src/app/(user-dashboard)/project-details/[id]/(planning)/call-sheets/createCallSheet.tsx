// createCallSheet.tsx
import React, { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import CallSheetTemplate from './Template/CallSheetTemplate';
import { Button } from '@/components/ui/button';
import { initialFormData } from './Template/formData';
import { CallSheet } from './types';
import { FaEdit, FaDownload } from 'react-icons/fa';

interface CreateCallSheetFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: CallSheet) => void;
    initialFormData: CallSheet;
}

const CreateCallSheetFormModal: FC<CreateCallSheetFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [formStep, setFormStep] = useState<number>(1);
    const [formData, setFormData] = useState<CallSheet>(initialFormData);
    const [isCallSheetCreated, setIsCallSheetCreated] = useState<boolean>(false);
    const templateRef = useRef(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleNext = (e: FormEvent) => {
        e.preventDefault();
        setFormStep(2);
    };

    const handleBack = (e: FormEvent) => {
        e.preventDefault();
        setFormStep(1);
    };

    const handleFormReset = () => {
        setFormStep(1);
        setFormData(initialFormData);
    };

    const handleClose = () => {
        handleFormReset();
        onClose();
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setIsCallSheetCreated(true);
        setFormStep(1);
        onClose();
    };

    const handlePrint = useReactToPrint({
        content: () => templateRef.current,
        documentTitle: `CallSheet_${formData.title}`,
    });

    const handleEdit = () => {
        setIsCallSheetCreated(false);
        setFormStep(1);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-xl w-full max-w-4xl mx-1 md:mx-2 lg:mx-2 max-h-full transform transition-transform duration-300 overflow-auto">
                        <div className="flex justify-between items-center pb-2 mb-4 border-b">
                            <h2 className="text-2xl font-medium">Create call sheet</h2>
                            <button onClick={handleClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                        </div>

                        {isCallSheetCreated ? (
                            <div className="flex justify-between items-center p-2 bg-white">
                                <div className='mt-1'>
                                    <h3 className="text-lg font-sm">{formData.title}</h3>
                                    <p>{formData.date}</p>
                                </div>
                                <div className="flex space-x-1">
                                    <Button onClick={handleEdit} variant="outline">
                                        <FaEdit />
                                    </Button>
                                    <Button onClick={handlePrint} variant="outline">
                                        <FaDownload />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {formStep === 1 && (
                                    <form onSubmit={handleNext}>
                                        <div className="mb-4 w-full">
                                            <label className="block mb-2 text-sm font-medium">
                                                Title <span className="text-slate-400">(required)</span>
                                            </label>
                                            <input
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                                placeholder='Enter project title'
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">
                                                    Date <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                                                    type="date"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">
                                                    Call Time <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                                                    type="time"
                                                    name="callTime"
                                                    value={formData.callTime}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <footer className="pt-4 flex justify-between space-x-4 mt-2 w-full">
                                            <Button onClick={handleClose} type="button" variant="outline">Cancel</Button>
                                            <Button type="submit">Next</Button>
                                        </footer>
                                    </form>
                                )}

                                {formStep === 2 && (
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3">
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">Street</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="text"
                                                    name="street"
                                                    value={formData.street}
                                                    onChange={handleChange}
                                                    placeholder='123 Main St'
                                                    required
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">City</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    placeholder='Anytown'
                                                    required
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">Country</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="text"
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                    placeholder='USA'
                                                    required
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">Website</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="url"
                                                    name="website"
                                                    value={formData.website}
                                                    onChange={handleChange}
                                                    placeholder='https://example.com'
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">Contact Number</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="tel"
                                                    name="contact"
                                                    value={formData.contact}
                                                    onChange={handleChange}
                                                    placeholder='555-555-5555'
                                                    required
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">Producer</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="text"
                                                    name="producerName"
                                                    value={formData.producerName}
                                                    onChange={handleChange}
                                                    placeholder="e.g. James Cameron"
                                                    required
                                                />
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="tel"
                                                    name="producerContact"
                                                    value={formData.producerContact}
                                                    onChange={handleChange}
                                                    placeholder="555-555-5555"
                                                    required
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">Director</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="text"
                                                    name="directorName"
                                                    value={formData.directorName}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Christopher Nolan"
                                                    required
                                                />
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="tel"
                                                    name="directorContact"
                                                    value={formData.directorContact}
                                                    onChange={handleChange}
                                                    placeholder="555-555-5555"
                                                    required
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">Production Manager</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="text"
                                                    name="productionManagerName"
                                                    value={formData.productionManagerName}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Stephen Spielberg"
                                                    required
                                                />
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="tel"
                                                    name="productionManagerContact"
                                                    value={formData.productionManagerContact}
                                                    onChange={handleChange}
                                                    placeholder="555-555-5555"
                                                    required
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">Breakfast</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="time"
                                                    name="breakfast"
                                                    value={formData.breakfast}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">Lunch</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="time"
                                                    name="lunch"
                                                    value={formData.lunch}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">Sunrise</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="time"
                                                    name="sunrise"
                                                    value={formData.sunrise}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">Sunset</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="time"
                                                    name="sunset"
                                                    value={formData.sunset}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">Weather</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 mb-2 text-sm"
                                                    type="text"
                                                    name="weather"
                                                    value={formData.weather}
                                                    onChange={handleChange}
                                                    placeholder='e.g. 33°C, Humid'
                                                    required
                                                />
                                            </div>
                                            <div className="md:col-span-2 lg:col-span-3 w-full">
                                                <label className="block mb-2 text-sm font-medium">Nearest Hospital Address</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="text"
                                                    name="nearestHospital"
                                                    value={formData.nearestHospital}
                                                    onChange={handleChange}
                                                    placeholder='e.g. City Hospital, 123 Main St, Anytown, USA'
                                                    required
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">Nearest Police Station</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="text"
                                                    name="nearestPoliceStation"
                                                    value={formData.nearestPoliceStation}
                                                    onChange={handleChange}
                                                    placeholder='e.g. Town Police Station, 123 Main St, Anytown, USA'
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="block mb-2 text-sm font-medium">Nearest Fire Station</label>
                                                <input
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 mb-2 text-sm"
                                                    type="text"
                                                    name="nearestFireStation"
                                                    value={formData.nearestFireStation}
                                                    onChange={handleChange}
                                                    placeholder='e.g. Town Fire Station, 123 Main St, Anytown, USA'
                                                />
                                            </div>
                                            <div className="md:col-span-2 lg:col-span-3 w-full">
                                                <label className="block mb-2 text-sm font-medium">Additional Details</label>
                                                <textarea
                                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                                                    name="additionalDetails"
                                                    value={formData.additionalDetails}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    placeholder='Additional details about the call sheet'
                                                />
                                            </div>
                                        </div>
                                        <footer className="pt-4 flex flex-row justify-between space-x-4 mt-4 border-gray-200 w-full">
                                            <Button onClick={handleBack} type="button" variant="outline" className="w-24 sm:w-auto">Back</Button>
                                            <div className="flex flex-row space-x-4 items-center justify-end w-full sm:w-auto">
                                                <Button onClick={handleClose} type="button" variant="outline">Cancel</Button>
                                                <Button type="submit">Create</Button>
                                            </div>
                                        </footer>
                                    </form>
                                )}
                            </>
                        )}

                        <div className="hidden">
                            <CallSheetTemplate ref={templateRef} formData={formData} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateCallSheetFormModal;
