/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'cherry8': '#1877F2',
        'white8': '#FCF6F5',
        'grey8': '#b0b0b0',
        
        'azure-radiance': {
          '50': '#eef8ff',
          '100': '#daefff',
          '200': '#bde3ff',
          '300': '#8fd3ff',
          '400': '#5ab8ff',
          '500': '#3499fd',
          '600': '#1877f2',
          '700': '#1664df',
          '800': '#1950b4',
          '900': '#1a468e',
          '950': '#152c56',
      },

      'oxford-blue': {
        '50': '#f2f8f9',
        '100': '#ddeaf0',
        '200': '#bfd7e2',
        '300': '#93bacd',
        '400': '#6095b0',
        '500': '#447996',
        '600': '#3b647f',
        '700': '#355369',
        '800': '#324758',
        '900': '#3D3D3D',
        '950': '#0d0d0d',
    },
      
      },
    },
  },
  plugins: [],
}

