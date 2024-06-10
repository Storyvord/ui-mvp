interface Equipment {
    name: string;
    type: string;
    brand: string;
    model: string;
    resolution: string;
    frame_rate: string;
    sensor_type: string;
    connectivity: string[];
    audio_input: string[];
    battery_life: string;
    weight: string;
    accessories: string[];
    rental_price_per_day: string;
    provider: {
      name: string;
      contact: {
        phone: string;
        email: string;
        address: string;
      };
    };
    availability: {
      start_date: string;
      end_date: string;
      status: string;
    };
  }

export const EquipmentData:Equipment[] =  [
    {
      name: "broadcast_camera",
      type: "Camera Equipment",
      brand: "Sony",
      model: "HDC-3500",
      resolution: "4K",
      frame_rate: "60 fps",
      sensor_type: "3CMOS",
      connectivity: ["SDI", "HDMI", "Ethernet"],
      audio_input: ["XLR", "3.5mm jack"],
      battery_life: "8 hours",
      weight: "4.5 kg",
      accessories: [
        "lens_cap",
        "battery_pack",
        "charger",
        "handheld_grip",
        "shoulder_mount",
      ],
      rental_price_per_day: "300 USD",
      provider: {
        name: "ProMedia Rentals",
        contact: {
          phone: "+971 1234 5678",
          email: "contact@promediarentals.com",
          address: "123 Media Lane, Dubai",
        },
      },
      availability: {
        start_date: "2024-06-10",
        end_date: "2024-06-30",
        status: "available",
      },
    },
  ];
