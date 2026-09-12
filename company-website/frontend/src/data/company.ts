export interface OfficeLocation {
  label: string;
  badge: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  mapLink: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  offices: OfficeLocation[];
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube?: string;
  };
  mapEmbedUrl: string;
  stats: {
    label: string;
    value: string;
    suffix: string;
    numericValue: number;
  }[];
}

/**
 * Company information — update these values with real business data.
 * All placeholder values are clearly marked with [PLACEHOLDER].
 */
export const company: CompanyInfo = {
  name: "Prasanth Associates",
  tagline: "Building Spaces That Last for Generations",
  description:
    "From architectural design to final handover, we deliver thoughtfully engineered homes and commercial spaces with uncompromising quality.",
  phone: "+91 94860 38761", // [PLACEHOLDER]
  email: "info@prasanthassociates.com", // [PLACEHOLDER]
  address: {
    street: "2nd St, 243, Second Floor, Sowma Complex, Gandhipuram, Sathy Road",
    city: "Coimbatore",
    state: "Tamil Nadu",
    pincode: "641012",
    country: "India",
  },
  offices: [
    {
      label: "Coimbatore",
      badge: "Head Office",
      street: "2nd St, 243, Second Floor, Sowma Complex, Gandhipuram, Sathy Road",
      city: "Coimbatore",
      state: "Tamil Nadu",
      pincode: "641012",
      country: "India",
      phone: "+91 94860 38761",
      email: "info@prasanthassociates.com",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2737!2d76.9662768!3d11.017756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8590064684247%3A0xf6131f07c6935a32!2sPrasanth%20Associates!5e0!3m2!1sen!2sin!4v1700000000000",
      mapLink:
        "https://www.google.com/maps/place/Prasanth+Associates/@11.017756,76.9688517,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba8590064684247:0xf6131f07c6935a32!8m2!3d11.017756!4d76.9688517!16s%2Fg%2F11xgkf0822",
    },
    {
      label: "Gudalur",
      badge: "Branch Office",
      street: "No: 6, Thiruvalluvar Commercial Complex, Near SBI ATM, Ooty Main Road",
      city: "The Nilgiris",
      state: "Tamil Nadu",
      pincode: "643212",
      country: "India",
      phone: "+91 94860 38761",
      email: "info@prasanthassociates.com",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.3789!2d76.491225!3d11.5001001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8a722ff0c8105%3A0x1f66b5d25ee1e613!2sPrasanth%20Construction!5e0!3m2!1sen!2sin!4v1700000000000",
      mapLink:
        "https://www.google.com/maps/place/Prasanth+Construction/@11.5001001,76.4937999,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba8a722ff0c8105:0x1f66b5d25ee1e613!8m2!3d11.5001001!4d76.4937999!16s%2Fg%2F11clvfbk09",
    },
  ],
  hours: {
    weekdays: "9:00 AM – 6:00 PM",
    saturday: "9:00 AM – 6:00 PM",
    sunday: "Closed",
  },
  social: {
    instagram: "https://instagram.com/prasanthassociates", // [PLACEHOLDER]
    facebook: "https://facebook.com/prasanthassociates", // [PLACEHOLDER]
    linkedin: "https://linkedin.com/company/prasanthassociates", // [PLACEHOLDER]
    youtube: "https://youtube.com/@prasanthassociates", // [PLACEHOLDER]
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2737!2d76.9662768!3d11.017756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8590064684247%3A0xf6131f07c6935a32!2sPrasanth%20Associates!5e0!3m2!1sen!2sin!4v1700000000000", // [PLACEHOLDER]
  stats: [
    {
      label: "Years Experience",
      value: "15",
      suffix: "+",
      numericValue: 15,
    },
    {
      label: "Projects Delivered",
      value: "250",
      suffix: "+",
      numericValue: 250,
    },
    {
      label: "Sq. Ft. Constructed",
      value: "2M",
      suffix: "+",
      numericValue: 2000000,
    },
    {
      label: "Client Satisfaction",
      value: "98",
      suffix: "%",
      numericValue: 98,
    },
  ],
};

