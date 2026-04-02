export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrompt: string;
}

export interface MockupResult {
  id: string;
  productId: string;
  imageUrl: string;
  timestamp: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'tshirt-black',
    name: 'Classic Black T-Shirt',
    category: 'Apparel',
    description: 'A high-quality cotton black t-shirt.',
    basePrompt: 'A high-quality studio shot of a person wearing a plain black t-shirt, front view, neutral background.'
  },
  {
    id: 'tshirt-white',
    name: 'Classic White T-Shirt',
    category: 'Apparel',
    description: 'Premium white cotton t-shirt.',
    basePrompt: 'A crisp, professional studio shot of a plain white t-shirt on a ghost mannequin, clean lighting.'
  },
  {
    id: 'hoodie-gray',
    name: 'Premium Gray Hoodie',
    category: 'Apparel',
    description: 'Soft and comfortable gray hoodie.',
    basePrompt: 'A professional mockup of a plain gray hoodie on a wooden table, flat lay.'
  },
  {
    id: 'hoodie-black',
    name: 'Premium Black Hoodie',
    category: 'Apparel',
    description: 'Heavyweight black hoodie.',
    basePrompt: 'A high-quality studio shot of a plain black hoodie, front view, neutral background.'
  },
  {
    id: 'sweatpants-black',
    name: 'Classic Black Joggers',
    category: 'Apparel',
    description: 'Comfortable fleece-lined joggers.',
    basePrompt: 'A professional studio shot of plain black joggers on a neutral background.'
  },
  {
    id: 'bomber-jacket',
    name: 'Urban Bomber Jacket',
    category: 'Apparel',
    description: 'Sleek black bomber jacket.',
    basePrompt: 'A high-quality studio shot of a plain black bomber jacket, front view.'
  },
  {
    id: 'beanie-navy',
    name: 'Knitted Navy Beanie',
    category: 'Apparel',
    description: 'Warm acrylic knitted beanie.',
    basePrompt: 'A close-up shot of a navy blue knitted beanie on a clean surface.'
  },
  {
    id: 'socks-white',
    name: 'Crew Socks',
    category: 'Apparel',
    description: 'Classic white cotton crew socks.',
    basePrompt: 'A pair of plain white crew socks displayed on a minimalist background.'
  },
  {
    id: 'mug-white',
    name: 'Ceramic Coffee Mug',
    category: 'Home',
    description: 'Minimalist white ceramic mug.',
    basePrompt: 'A minimalist white ceramic coffee mug on a clean white desk next to a laptop.'
  },
  {
    id: 'mug-black',
    name: 'Matte Black Mug',
    category: 'Home',
    description: 'Sleek matte black ceramic mug.',
    basePrompt: 'A sleek matte black ceramic coffee mug on a dark stone surface, dramatic lighting.'
  },
  {
    id: 'water-bottle',
    name: 'Steel Water Bottle',
    category: 'Home',
    description: 'Insulated stainless steel bottle.',
    basePrompt: 'A minimalist stainless steel water bottle on a clean gym floor background.'
  },
  {
    id: 'pillow-white',
    name: 'Throw Pillow',
    category: 'Home',
    description: 'Soft decorative throw pillow.',
    basePrompt: 'A plain white square throw pillow on a modern gray sofa.'
  },
  {
    id: 'wall-clock',
    name: 'Minimalist Wall Clock',
    category: 'Home',
    description: 'Clean design wall clock.',
    basePrompt: 'A minimalist white wall clock on a clean white wall, soft shadows.'
  },
  {
    id: 'apron-black',
    name: 'Chef Apron',
    category: 'Home',
    description: 'Durable black cotton apron.',
    basePrompt: 'A plain black cotton apron hanging on a kitchen hook, rustic background.'
  },
  {
    id: 'tote-bag',
    name: 'Canvas Tote Bag',
    category: 'Accessories',
    description: 'Durable canvas tote bag for daily use.',
    basePrompt: 'A canvas tote bag hanging on a minimalist pegboard, natural lighting.'
  },
  {
    id: 'cap-navy',
    name: 'Structured Navy Cap',
    category: 'Accessories',
    description: 'Classic 6-panel structured cap.',
    basePrompt: 'A close-up shot of a navy blue baseball cap on a clean surface.'
  },
  {
    id: 'cap-black',
    name: 'Structured Black Cap',
    category: 'Accessories',
    description: 'Classic 6-panel black cap.',
    basePrompt: 'A close-up shot of a plain black baseball cap on a wooden surface.'
  },
  {
    id: 'backpack-black',
    name: 'Minimalist Backpack',
    category: 'Accessories',
    description: 'Sleek urban daypack.',
    basePrompt: 'A minimalist black backpack standing on a clean concrete floor.'
  },
  {
    id: 'umbrella-black',
    name: 'Compact Umbrella',
    category: 'Accessories',
    description: 'Automatic compact umbrella.',
    basePrompt: 'A closed black compact umbrella on a rainy window sill background.'
  },
  {
    id: 'phone-case',
    name: 'iPhone Case',
    category: 'Tech',
    description: 'Minimalist protective phone case.',
    basePrompt: 'A minimalist plain phone case on a clean desk next to a tablet, top view.'
  },
  {
    id: 'laptop-sleeve',
    name: 'Laptop Sleeve',
    category: 'Tech',
    description: 'Padded protective sleeve.',
    basePrompt: 'A minimalist gray felt laptop sleeve on a wooden desk.'
  },
  {
    id: 'mouse-pad',
    name: 'Gaming Mouse Pad',
    category: 'Tech',
    description: 'Large smooth surface mouse pad.',
    basePrompt: 'A large black rectangular mouse pad on a gaming desk setup.'
  },
  {
    id: 'power-bank',
    name: 'Portable Power Bank',
    category: 'Tech',
    description: 'Sleek portable battery pack.',
    basePrompt: 'A sleek black portable power bank on a clean white surface.'
  },
  {
    id: 'notebook',
    name: 'A5 Notebook',
    category: 'Office',
    description: 'Hardcover A5 notebook.',
    basePrompt: 'A hardcover A5 notebook on a desk next to a pen, professional studio lighting.'
  },
  {
    id: 'poster-framed',
    name: 'Framed Wall Art',
    category: 'Office',
    description: 'Black wooden frame with mat.',
    basePrompt: 'A vertical black framed poster with a white mat on a clean office wall.'
  },
  {
    id: 'sticker-pack',
    name: 'Sticker Sheet',
    category: 'Office',
    description: 'Vinyl sticker sheet.',
    basePrompt: 'A sheet of vinyl stickers on a clean white background, top view.'
  },
  {
    id: 'yoga-mat',
    name: 'Eco Yoga Mat',
    category: 'Lifestyle',
    description: 'Non-slip eco-friendly mat.',
    basePrompt: 'A rolled-up teal yoga mat on a clean wooden floor with soft sunlight.'
  },
  {
    id: 'beach-towel',
    name: 'Large Beach Towel',
    category: 'Lifestyle',
    description: 'Soft absorbent beach towel.',
    basePrompt: 'A large plain white beach towel spread out on clean sand.'
  },
  {
    id: 'duffel-bag',
    name: 'Weekend Duffel Bag',
    category: 'Lifestyle',
    description: 'Spacious travel duffel bag.',
    basePrompt: 'A black canvas duffel bag on a wooden bench in a locker room.'
  },
  {
    id: 'face-mask',
    name: 'Fabric Face Mask',
    category: 'Lifestyle',
    description: 'Washable cotton face mask.',
    basePrompt: 'A plain black fabric face mask displayed on a clean white surface.'
  }
];
