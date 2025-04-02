import forms from "@tailwindcss/forms";

export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
		  colors: {
			border: "hsl(240, 5%, 90%)", 
			background: "hsl(0, 0%, 100%)", 
			foreground: "hsl(222.2, 84%, 4.9%)",// Default Border Color Define Kar Raha Hu
		  },
		},
	  },
	plugins: [forms],
  };
  