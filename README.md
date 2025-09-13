# Mars Rover Gallery

A web application to **view, search, and filter Mars photos** captured by NASA Rovers. The project uses Next.js, TypeScript, and MUI, with a modern Pinterest-style design.

---

## Technologies Used

- **Next.js 15** – React framework for SSR and static site generation
- **TypeScript** – static typing for safer code
- **MUI (Material UI)** – component library with modern design
- **NASA Mars Rover Photos API** – source of images and data
- **React Hooks** – state and effect management
- **Masonry Layout** – Pinterest-style layout for photo cards
- **Poppins** – font used in the UI

---

## Design

- Black background throughout the application
- **Poppins** font
- Photo cards displayed in 4 columns
- Each card shows:
  - **Photo date (Earth date)**
  - **Camera name**
  - **Rover name**
- Responsive layout with Masonry to organize photos
- Home page shows the **latest photos** (`latest_photos`) from **Curiosity** and **Perseverance**

---

## Features

### Available Filters:

1. **Rover Selection**  
   - Search photos by a specific rover (Curiosity or Perseverance)  
   - Example endpoint:  
     ```
     https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=YOUR_KEY
     ```

2. **Camera Selection**  
   - Available cameras:  
     ```
     CHEMCAM_RMI, NAVCAM_LEFT, NAVCAM_RIGHT, NAV_RIGHT_B, FRONT_HAZCAM_RIGHT_A, SUPERCAM_RMI;
     ```  
   - Photos appear automatically when a camera is selected  
   - Example endpoint:  
     ```
     https://api.nasa.gov/mars-photos/api/v1/rovers/{rover_name}/photos?camera={camera_abbr}&api_key=YOUR_KEY
     ```

3. **Earth Date Selection**  
   - Filter photos taken on a specific Earth date  
   - Example endpoint:  
     ```
     https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2025-01-01&api_key=YOUR_KEY
     ```

## How to Run

### Prerequisites

- Node.js >= 20
- npm
- NASA API key (https://api.nasa.gov/)

### Steps

1. Clone the repository:
```bash
git clone https://github.com/nathaliaacl/mars-rover-gallery.git
cd mars-rover-gallery
```

2. Install dependencies:
```bash
npm install

3. Create a `.env.local` file and add your NASA API key:
```
NEXT_PUBLIC_NASA_API_KEY=YOUR_KEY
```

4. Run the development server:
```bash
npm run dev

5. Open the application at [http://localhost:3000](http://localhost:3000)
