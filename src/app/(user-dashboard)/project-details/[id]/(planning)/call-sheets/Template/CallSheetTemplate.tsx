import Image from "next/image";
import { forwardRef } from "react";
import Logo from "./logo1.jpeg";
import { useGetCallSheetDetails } from "@/lib/react-query/queriesAndMutations/callsheet";

const CallSheetTemplate = forwardRef<HTMLDivElement, { id: number }>((props, ref) => {
  // Hardcoded data
  const street = "Central Park";
  const city = "New York";
  const country = "USA";
  const website = "www.example.com";
  const contact = "contact@example.com";
  const producerName = "John Producer";
  const producerContact = "123-456-7890";
  const directorName = "Jane Director";
  const directorContact = "987-654-3210";
  const productionManagerName = "Alex PM";
  const productionManagerContact = "111-222-3333";
  const breakfast = "8:00 AM";
  const lunch = "1:00 PM";
  const sunrise = "6:30 AM";
  const sunset = "7:30 PM";
  const weather = "Sunny, 25°C";
  const nearestHospital = "City Hospital";
  const nearestPoliceStation = "Downtown Police Station";
  const nearestFireStation = "Central Fire Station";
  const additionalDetails = "Be mindful of pedestrians in the park.";
  const title = "Project Sunrise";
  const callTime = "08:00:00";

  // Generate the Google Maps Embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAnmHDoxexwRcNy63vKd-my62JA6Xy4L7M&q=${encodeURIComponent(
    street
  )},${encodeURIComponent(city)},${encodeURIComponent(country)}`;

  const { data } = useGetCallSheetDetails(props.id);
  console.log(props.id);
  console.log(data);

  return (
    <div
      ref={ref}
      className="p-4 bg-white border-2 box-border"
      style={{ width: "210mm", height: "297mm", margin: "auto" }}
    >
      <div className="flex justify-between mb-4">
        <div className="w-1/3 border p-2 text-sm">
          <table className="w-full border-collapse border text-xs mt-2">
            <tbody>
              <tr>
                <td className="border px-2 py-1">
                  <strong>Breakfast:</strong>
                </td>
                <td className="border px-2 py-1">{breakfast}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">
                  <strong>Lunch:</strong>
                </td>
                <td className="border px-2 py-1">{lunch}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="w-1/5 text-center">
          <Image src={Logo} alt="Logo" className="mx-auto -my-2 size-18" />
          <h1 className="text-md font-normal mb-2">{data?.title}</h1>
          <p className="text-lg font-semibold border-2 border-black rounded-full">{callTime}</p>
        </div>
        <div className="w-1/3 border p-2">
          <table className="w-full border-collapse border text-sm">
            <tbody>
              <tr>
                <td className="border px-2 py-1">
                  <strong>Sunrise:</strong>
                </td>
                <td className="border px-2 py-1">{sunrise}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">
                  <strong>Sunset:</strong>
                </td>
                <td className="border px-2 py-1">{sunset}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">
                  <strong>Weather:</strong>
                </td>
                <td className="border px-2 py-1">{weather}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="w-1/2 border p-2 h-48">
          <iframe width="100%" height="100%" style={{ border: 0 }} src={mapUrl} allowFullScreen />
        </div>

        <div className="w-1/2 border p-2 text-sm flex flex-col gap-3 pt-4">
          <p>
            <strong>Address: </strong>
            {street}, {city}, {country}
          </p>
          <p>
            <strong>Nearest Police Station:</strong> {nearestPoliceStation}
          </p>
          <p>
            <strong>Nearest Fire Station:</strong> {nearestFireStation}
          </p>
          <p>
            <strong>Nearest Hospital:</strong>
            {nearestHospital}
          </p>
        </div>
      </div>

      {/* Crew Contact Information */}
      <table className="w-full border-collapse border text-xs mt-8">
        <thead>
          <tr>
            <th className="border px-2 py-1">POSITION</th>
            <th className="border px-2 py-1">NAME</th>
            <th className="border px-2 py-1">PHONE</th>
            <th className="border px-2 py-1">EMAIL</th>
            <th className="border px-2 py-1">CALL TIME</th>
            <th className="border px-2 py-1">REMARKS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">Producer</td>
            <td className="border px-2 py-1"></td>
            <td className="border px-2 py-1"></td>
            <td className="border px-2 py-1"></td>
            <td className="border px-2 py-1"></td>
          </tr>
        </tbody>
      </table>

      {/* Production Notes */}
      <table className="w-full mb-4 border-collapse border text-xs mt-6">
        <thead>
          <tr>
            <th className="border px-2 py-1">PRODUCTION NOTES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-5"></td>
          </tr>
        </tbody>
      </table>

      {/* ADDITIONAL Notes */}
      <table className="w-full mb-4 border-collapse border text-xs mt-6">
        <thead>
          <tr>
            <th className="border px-2 py-1">ADDITIONAL NOTES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-5 text-center">{additionalDetails}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

CallSheetTemplate.displayName = "CallSheetTemplate";

export default CallSheetTemplate;
