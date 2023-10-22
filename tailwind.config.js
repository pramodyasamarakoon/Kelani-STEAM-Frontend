/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "OpenSans-ExtraBold" : ["OpenSans-ExtraBold"],
        "OpenSans-Medium" : ["OpenSans-Medium"],
        "OpenSans-Regular" : ["OpenSans-Regular"],
        "OpenSans-SemiBold" : ["OpenSans-SemiBold"],
        "Poppins-Light" : ["Poppins-Light"],
        "Poppins-Regular" : ["Poppins-Regular"],
        "Poppins-SemiBold" : ["Poppins-SemiBold"],
        "Poppins-SemiBoldItalic" : ["Poppins-SemiBoldItalic"],
        "DancingScript-Regular" : ["DancingScript-Regular"],
        "DancingScript-SemiBold" : ["DancingScript-SemiBold"],
        "Lobster-Regular" : ["Lobster-Regular"],
      },
    },
  },
  plugins: [],
}