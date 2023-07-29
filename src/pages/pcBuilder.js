import PCBuilder from "@/components/UI/PCBuilder";

const PcBuilder = () => {
    const category = [
  {
    "id": 1,
    "category": "CPU-Processor",
    "image_url": "https://www.startech.com.bd/image/cache/catalog/cpu-cooler/antec/t120/t120-01-228x228.jpg"
  },
  {
    "id": 2,
    "category": "Motherboard",
    "image_url": "https://www.startech.com.bd/image/cache/catalog/motherboard/asus/prime-h610m-K-d4/prime-h610m-K-d4-02-228x228.jpg"
  },
  {
    "id": 3,
    "category": "RAM",
    "image_url": "https://www.startech.com.bd/image/cache/catalog/ram/cosair/vengeance-8gb-ddr4-3200mhz/vengeance-8gb-ddr4-3200mhz-01-228x228.webp"
  },
  {
    "id": 4,
    "category": "Power Supply Unit",
    "image_url": "https://www.startech.com.bd/image/cache/catalog/power-supply/asus/thor-1200p2/thor-1200p2-228x228.webp"
  },
  {
    "id": 5,
    "category": "Storage Device",
    "image_url": "https://www.startech.com.bd/image/cache/catalog/storage/asustor/as6602t/as6602t-01-228x228.webp"
  },
  {
    "id": 6,
    "category": "Monitor",
    "image_url": "https://www.startech.com.bd/image/cache/catalog/monitor/lg-monitor/20mk400h/20mk400h-228x228.jpg"
  }
];


console.log(category);
    return (
        <div>
             <PCBuilder allProducts={category}></PCBuilder>
        </div>
    );
};


export default PcBuilder;