import type { Brand, Product, Service, Page, Reference, GalleryItem, HeroSlide } from '../types';

export const mockBrands: Brand[] = [
  {
    id: 1,
    slug: 'cimolai-technology',
    name: 'Cimolai Technology',
    logoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=300&auto=format&fit=crop&q=80',
    descriptionTr: 'Marina, tersane ve ağır sanayi için dünyaca ünlü İtalyan mobil vinç ve bot taşıyıcı imalatçısı. 1000 tona kadar mobil boat hoist çözümleri.',
    descriptionEn: 'World-renowned Italian manufacturer of mobile boat hoists and transporters for marinas and shipyards. Lifting solutions up to 1000 tons.',
    orderIndex: 1,
    isActive: true
  },
  {
    id: 2,
    slug: 'marine-crane-co',
    name: 'Marine Crane Co.',
    logoUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&auto=format&fit=crop&q=80',
    descriptionTr: 'Güverte vinçleri, mafsallı boom vinçler ve liman portal vinçlerinde yüksek mukavemetli mühendislik çözümleri.',
    descriptionEn: 'High-strength engineering solutions in deck cranes, knuckle boom cranes, and port gantry cranes.',
    orderIndex: 2,
    isActive: true
  },
  {
    id: 3,
    slug: 'heavy-transporter-systems',
    name: 'Heavy Transporter Systems',
    logoUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&auto=format&fit=crop&q=80',
    descriptionTr: 'Tersane içi tekne ve kargo transferi sağlayan kendinden tahrikli modüler taşıyıcı (SPMT) ve paletli römorklar.',
    descriptionEn: 'Self-propelled modular transporters (SPMT) and motorized trailers for yard boat transfers.',
    orderIndex: 3,
    isActive: true
  }
];

export const mockProducts: Product[] = [
  {
    id: 1,
    brandId: 1,
    slug: 'mbh-800-mobil-tekne-kaldirma-vinci',
    titleTr: 'MBH 800 Mobil Tekne Kaldırma Vinci (Boat Hoist)',
    titleEn: 'MBH 800 Mobile Boat Hoist',
    summaryTr: '800 ton kaldırma kapasitesine sahip, dev süperyat ve mega yatlar için özel tasarlanmış elektrikli/hidrolik mobil marina vinci.',
    summaryEn: '800-ton lifting capacity mobile boat hoist custom designed for mega yachts and shipyard operations.',
    contentTr: `MBH 800 Mobil Tekne Kaldırma Vinci, modern marina ve tersanelerde en zorlu kaldırma operasyonlarını güvenle gerçekleştirmek için geliştirilmiştir. 
    
    Öne Çıkan Özellikler:
    - 800 Ton Güvenli Çalışma Yükü (SWL)
    - Elektronik çok yönlü direksiyon sistemi (90 derece yengeç yürüyüşü, sıfır yarıçap dönme)
    - Hassas uzaktan kumanda ve yük tartım hücreleri
    - Çevre dostu faz-4 dizel motor veya %100 elektrikli güç ünitesi seçeneği
    - Gövde korumalı özel kaplamalı bez sapanlar (slings)`,
    contentEn: `MBH 800 Mobile Boat Hoist is engineered for mega yacht handling in modern marinas and shipyards.
    
    Key Features:
    - 800 Ton Safe Working Load (SWL)
    - Multi-directional electronic steering (crab walk, carousel rotation)
    - Wireless remote control with integrated load cell weigh scale
    - Eco-friendly Stage V diesel or 100% electric drive system
    - Hull-protecting padded sling straps`,
    specsJson: {
      'Kapasite (SWL)': '800 Ton',
      'İç Net Genişlik': '16.5 Metre',
      'Kaldırma Yüksekliği': '14 Metre',
      'Yürüyüş Hızı (Yüklü)': '0 - 30 m/dk',
      'Direksiyon Modları': '4 Teker / 8 Teker / Yengeç',
      'Kumanda Sistem': '2.4 GHz Telsiz Uzaktan Kumanda'
    },
    catalogPdfUrl: '/uploads/catalogs/mbh-800-spec.pdf',
    featured: true,
    orderIndex: 1,
    isActive: true,
    primaryImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1000&auto=format&fit=crop&q=80',
    images: [
      { id: 1, productId: 1, imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1000&auto=format&fit=crop&q=80', isPrimary: true },
      { id: 2, productId: 1, imageUrl: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=1000&auto=format&fit=crop&q=80', isPrimary: false }
    ]
  },
  {
    id: 2,
    brandId: 1,
    slug: 'mbh-300-mobil-tekne-kaldirma-vinci',
    titleTr: 'MBH 300 Mobil Tekne Vinci',
    titleEn: 'MBH 300 Mobile Boat Hoist',
    summaryTr: ' Orta ve büyük ölçekli marinalar için ideal 300 ton kapasiteli, yüksek manevra kabiliyetine sahip mobil boat hoist.',
    summaryEn: '300-ton capacity mobile boat hoist with high maneuverability, ideal for medium to large marinas.',
    contentTr: 'MBH 300, marinaların en çok tercih ettiği esnek ve güvenilir tekne çekme/indirme vincidir.',
    contentEn: 'MBH 300 is the most preferred flexible and reliable boat hauling crane for commercial marinas.',
    specsJson: {
      'Kapasite (SWL)': '300 Ton',
      'İç Net Genişlik': '11.8 Metre',
      'Kaldırma Yüksekliği': '10 Metre',
      'Motor': 'Volvo Penta Diesel 220 HP'
    },
    catalogPdfUrl: null,
    featured: true,
    orderIndex: 2,
    isActive: true,
    primaryImage: 'https://images.unsplash.com/photo-1508873696983-2df515122519?w=1000&auto=format&fit=crop&q=80',
    images: [
      { id: 3, productId: 2, imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?w=1000&auto=format&fit=crop&q=80', isPrimary: true }
    ]
  },
  {
    id: 3,
    brandId: 1,
    slug: 'motorized-boat-transporter-mbt',
    titleTr: 'Motorize Bot Taşıyıcı Römork (MBT Series)',
    titleEn: 'Motorized Boat Transporter (MBT Series)',
    summaryTr: 'Marina çekek alanında teknelerin karada hızlı ve emniyetli şekilde park edilmesini sağlayan 30-150 ton motorize taşıyıcı.',
    summaryEn: '30-150 ton motorized hydraulic boat transporter trailer for marina dry dock yards.',
    contentTr: 'Hidrolik süspansiyonlu ve genişletilebilir gövde yapısı ile karadaki yat yerleşim yoğunluğunu maksimuma çıkarır.',
    contentEn: 'Maximizes dry dock storage capacity with hydraulic leveling suspension and extendable frame.',
    specsJson: {
      'Kapasite': '30 - 150 Ton',
      'Sürüş': 'Hidrostatik 4x4',
      'Direksiyon': 'Hidrolik 90 Derece'
    },
    catalogPdfUrl: null,
    featured: true,
    orderIndex: 3,
    isActive: true,
    primaryImage: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1000&auto=format&fit=crop&q=80',
    images: [
      { id: 4, productId: 3, imageUrl: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1000&auto=format&fit=crop&q=80', isPrimary: true }
    ]
  },
  {
    id: 4,
    brandId: 2,
    slug: 'mafsalli-gouverte-vinci-knuckle-boom',
    titleTr: 'Mafsallı Hidrolik Güverte Vinci (Knuckle Boom Crane)',
    titleEn: 'Marine Knuckle Boom Deck Crane',
    summaryTr: 'Servis tekneleri, römorkörler ve yatlar için deniz şartlarına dayanıklı korozyonsuz mafsallı güverte vinçleri.',
    summaryEn: 'Marine grade anti-corrosive knuckle boom deck cranes for workboats, tugs, and luxury yachts.',
    contentTr: 'Katlanabilir tasarımı sayesinde güvertede minimum yer kaplar.',
    contentEn: 'Foldable compact design minimizes footprint on vessel deck.',
    specsJson: {
      'Kapasite': '5 - 50 Ton/Metre',
      'Uzama': 'Hidrolik 4 Kademe',
      'Kaplama': 'C5-M Marine Seawater Paint'
    },
    catalogPdfUrl: null,
    featured: false,
    orderIndex: 4,
    isActive: true,
    primaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80',
    images: [
      { id: 5, productId: 4, imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80', isPrimary: true }
    ]
  }
];

export const mockServices: Service[] = [
  {
    id: 1,
    slug: 'satis-ve-projelendirme',
    titleTr: 'Satış ve Projelendirme',
    titleEn: 'Sales & Project Engineering',
    summaryTr: 'İhtiyaçlarınıza uygun ekipman seçimi, rıhtım ve çekek alanı yerleşim projelendirmesi.',
    summaryEn: 'Equipment selection tailored to your needs, dock layout engineering, and feasibility study.',
    contentTr: 'Songur Marin Makine uzman mühendislik kadrosu, marina ve tersanenizin fiziksel koşullarını inceleyerek rıhtım havuzu (quay basin) ölçülerine ve hedef tekne tonajına en uygun ekipman seçeneğini belirler.',
    contentEn: 'Our engineering team analyzes your marina and shipyard dimensions to specify the optimal lifting equipment matching quay basin and target vessel tonnage.',
    iconName: 'Compass',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    orderIndex: 1,
    isActive: true
  },
  {
    id: 2,
    slug: 'teknik-servis-ve-bakim',
    titleTr: '7/24 Teknik Servis & Bakım',
    titleEn: '24/7 Technical Service & Maintenance',
    summaryTr: 'Mobil boat hoist ve vinçlerin periyodik bakımı, hidrolik-elektronik arıza giderimi.',
    summaryEn: 'Periodic maintenance, hydraulic and electronic troubleshooting for boat hoists & marine cranes.',
    contentTr: 'Deneyimli teknik ekibimiz Türkiye ve çevre ülkelerdeki tüm marinalara 7/24 yerinde teknik servis, periyodik hidrolik-elektrik bakımı ve yıllık SWL test belgelendirmesi sağlar.',
    contentEn: 'Our experienced field engineers provide 24/7 onsite technical service, hydraulic overhaul, electrical troubleshooting, and annual load test certification across all ports.',
    iconName: 'Wrench',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    orderIndex: 2,
    isActive: true
  },
  {
    id: 3,
    slug: 'orijinal-yedek-parca',
    titleTr: 'Orijinal Yedek Parça Tedariği',
    titleEn: 'Original Spare Parts Supply',
    summaryTr: 'Cimolai ve tüm temsilcilikler için orijinal hidrolik pompa, valf, sapan ve tekerlek stokları.',
    summaryEn: 'Genuine spare parts inventory including hydraulic pumps, valves, lifting slings, and wheel assemblies.',
    contentTr: 'Geniş stok depomuz sayesinde aşınan sapanlar, hidrolik hortumlar, uzaktan kumanda üniteleri ve yedek parçalar derhal teslim edilir.',
    contentEn: 'Our comprehensive warehouse stock guarantees rapid delivery of lifting straps, hydraulic hoses, wireless controllers, and mechanical spares.',
    iconName: 'PackageCheck',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    orderIndex: 3,
    isActive: true
  },
  {
    id: 4,
    slug: 'supervizorluk-ve-egitim',
    titleTr: 'Süpervizörlük ve Operatör Eğitimi',
    titleEn: 'Supervision & Operator Training',
    summaryTr: 'Ekipman montaj süpervizörlüğü ve marina personeliniz için emniyetli vinç kullanım eğitimi.',
    summaryEn: 'Equipment assembly supervision and safety operation training for your marina staff.',
    contentTr: 'Yeni teslim edilen ekipmanların sahada montajı, sertifikalandırılması ve operatörlerin emniyetli kaldırma standartlarında eğitilmesi.',
    contentEn: 'On-site assembly oversight, certification load tests, and comprehensive safety training for equipment operators.',
    iconName: 'GraduationCap',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    orderIndex: 4,
    isActive: true
  }
];

export const mockReferences: Reference[] = [
  {
    id: 1,
    clientName: 'Viaport Marina Tuzla',
    logoUrl: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=300&auto=format&fit=crop&q=80',
    titleTr: 'Viaport Marina Tuzla — MBH 800 Ton Vinç Kurulumu',
    titleEn: 'Viaport Marina Tuzla — MBH 800 Ton Hoist Installation',
    descriptionTr: 'Türkiye\'nin en büyük mega yat marinalarından biri olan Viaport Marina için Cimolai MBH 800 mobil boat hoist teslimatı ve devreye alınması.',
    descriptionEn: 'Delivery and commissioning of Cimolai MBH 800 mobile boat hoist for Viaport Marina Tuzla, one of Turkey\'s premier mega yacht hubs.',
    projectYear: 2022,
    orderIndex: 1,
    isActive: true
  },
  {
    id: 2,
    clientName: 'D-Marin Turgutreis',
    logoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&auto=format&fit=crop&q=80',
    titleTr: 'D-Marin Turgutreis — MBH 300 Ton & Bot Taşıyıcı',
    titleEn: 'D-Marin Turgutreis — MBH 300 Ton & Transporter',
    descriptionTr: 'Bodrum bölgesinde marina çekek kapasitesini artıran 300 tonluk mobil kaldırma vincinin teslimi ve periyodik bakımı.',
    descriptionEn: 'Delivery and routine servicing of 300-ton boat hoist boosting shipyard capacity in Bodrum.',
    projectYear: 2021,
    orderIndex: 2,
    isActive: true
  },
  {
    id: 3,
    clientName: 'West İstanbul Marina',
    logoUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?w=300&auto=format&fit=crop&q=80',
    titleTr: 'West İstanbul Marina — 100 Ton Bot Taşıyıcı Römork',
    titleEn: 'West Istanbul Marina — 100 Ton Boat Transporter',
    descriptionTr: 'Çekek alanında yüksek yoğunluklu yat park imkanı sunan motorize hidrolik taşıyıcı teslimatı.',
    descriptionEn: 'Delivery of motorized hydraulic transporter allowing dense dry dock boat parking.',
    projectYear: 2023,
    orderIndex: 3,
    isActive: true
  },
  {
    id: 4,
    clientName: 'Marinturk İstanbul City Port',
    logoUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&auto=format&fit=crop&q=80',
    titleTr: 'Marinturk Pendik — Teknik Servis & Periyodik Bakım Sözleşmesi',
    titleEn: 'Marinturk Pendik — Technical Service & Maintenance Contract',
    descriptionTr: 'Pendik marinada yer alan kaldırma vinçlerinin yıllık revizyon, test ve 7/24 servis hizmetleri.',
    descriptionEn: 'Annual revision, load testing, and 24/7 technical service agreement for marina hoists.',
    projectYear: 2024,
    orderIndex: 4,
    isActive: true
  }
];

export const mockGallery: GalleryItem[] = [
  {
    id: 1,
    type: 'IMAGE',
    titleTr: 'MBH 800 Mega Yat Çekme Operasyonu',
    titleEn: 'MBH 800 Mega Yacht Hauling Operation',
    mediaUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80',
    category: 'Marina & Liman',
    orderIndex: 1,
    isActive: true
  },
  {
    id: 2,
    type: 'IMAGE',
    titleTr: 'Tersane Çekek Alanı Bot Taşıyıcı Transferi',
    titleEn: 'Shipyard Boat Transporter Transfer',
    mediaUrl: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=400&auto=format&fit=crop&q=80',
    category: 'Tersane & İmalat',
    orderIndex: 2,
    isActive: true
  },
  {
    id: 3,
    type: 'IMAGE',
    titleTr: 'Saha Süpervizörlüğü ve Montaj Aşaması',
    titleEn: 'Field Supervision and Assembly Phase',
    mediaUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
    category: 'Servis & Bakım',
    orderIndex: 3,
    isActive: true
  },
  {
    id: 4,
    type: 'VIDEO',
    titleTr: 'Cimolai MBH 800 Tanıtım ve Test Videosu',
    titleEn: 'Cimolai MBH 800 Demo & Testing Video',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?w=400&auto=format&fit=crop&q=80',
    category: 'Marina & Liman',
    orderIndex: 4,
    isActive: true
  },
  {
    id: 5,
    type: 'IMAGE',
    titleTr: 'Korozyon Önleyici Güverte Vinc Montajı',
    titleEn: 'Anti-corrosive Deck Crane Installation',
    mediaUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&auto=format&fit=crop&q=80',
    category: 'Tersane & İmalat',
    orderIndex: 5,
    isActive: true
  }
];

export const mockHeroSlides: HeroSlide[] = [
  {
    id: 1,
    titleTr: 'Denizcilik Sektöründe Güvenilir Çözüm Ortağınız',
    titleEn: 'Your Reliable Solution Partner in the Maritime Industry',
    subtitleTr: 'Marina, liman ve tersane projeleriniz için dünya standartlarında mobil vinç ve bot taşıyıcı sistemleri.',
    subtitleEn: 'World-class mobile boat hoists and boat transport systems for your marina, port and shipyard projects.',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&auto=format&fit=crop&q=80',
    buttonTextTr: 'Ürünlerimizi Keşfedin',
    buttonTextEn: 'Discover Our Products',
    buttonUrl: '/urunler',
    orderIndex: 1,
    isActive: true
  },
  {
    id: 2,
    titleTr: 'Cimolai Technology Türkiye Yetkili Temsilciliği',
    titleEn: 'Cimolai Technology Authorized Turkey Representative',
    subtitleTr: '1000 tona kadar kaldırma kapasiteli İtalyan mühendisliği harikası mobil vinçler ile gücünüze güç katın.',
    subtitleEn: 'Empower your shipyard with Italian engineering excellence hoists up to 1000 tons capacity.',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?w=1600&auto=format&fit=crop&q=80',
    buttonTextTr: 'Markalarımız',
    buttonTextEn: 'Our Brands',
    buttonUrl: '/markalar',
    orderIndex: 2,
    isActive: true
  },
  {
    id: 3,
    titleTr: '7/24 Uzman Teknik Servis & Orijinal Yedek Parça',
    titleEn: '24/7 Expert Technical Service & Genuine Spares',
    subtitleTr: 'Tüm vinç ve kaldırma sistemleriniz için profesyonel periyodik bakım, revizyon ve belgelendirme.',
    subtitleEn: 'Professional periodic maintenance, overhaul, and load certification for all lifting systems.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&auto=format&fit=crop&q=80',
    buttonTextTr: 'Hizmetlerimiz',
    buttonTextEn: 'Our Services',
    buttonUrl: '/hizmetler',
    orderIndex: 3,
    isActive: true
  }
];

export const mockPages: Page[] = [
  {
    id: 1,
    slug: 'hakkimizda',
    titleTr: 'Hakkımızda',
    titleEn: 'About Us',
    summaryTr: 'Songur Marin Makine olarak 25 yılı aşkın tecrübemizle denizcilik ve ağır sanayi sektörüne yön veriyoruz.',
    summaryEn: 'With over 25 years of experience, Songur Marin Machinery leads the maritime and heavy industry sector.',
    contentTr: `<h3>Denizcilik Ekipmanlarında Çeyrek Asırlık Mühendislik ve Güven</h3>
    <p>Songur Marin Makine, marina, liman ve tersane sektörlerinde kullanılan yüksek kapasiteli mobil kaldırma vinçleri (boat hoist), bot taşıyıcılar ve ağır sanayi transfer sistemleri alanında Türkiye'nin lider tedarikçi ve mühendislik firmalarından biridir.</p>
    <p>Dünya lideri <strong>Cimolai Technology</strong> başta olmak üzere uluslararası markaların yetkili temsilciliğini yürüten firmamız, satış öncesi projelendirmeden sahada montaja, 7/24 teknik servisten periyodik bakıma kadar uçtan uca hizmet sunmaktadır.</p>`,
    contentEn: `<h3>Quarter Century of Engineering and Trust in Marine Equipment</h3>
    <p>Songur Marin Machinery is one of Turkey's leading suppliers and engineering partners specializing in high-capacity mobile boat hoists, boat transporters, and heavy industrial transfer systems for marinas, ports, and shipyards.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1000&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    slug: 'misyon-vizyon',
    titleTr: 'Misyon & Vizyon',
    titleEn: 'Mission & Vision',
    summaryTr: 'Geleceğin marin kaldırma teknolojilerini en yüksek emniyet standartlarıyla buluşturuyoruz.',
    summaryEn: 'Combining future marine lifting technologies with the highest safety standards.',
    contentTr: `<h3>Misyonumuz</h3><p>Denizcilik ve ağır sanayi sektöründeki müşterilerimize, dünya standartlarında en güvenilir çözümleri sunmaktır.</p>`,
    contentEn: `<h3>Our Mission</h3><p>To provide our customers in maritime with world standard reliable solutions.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?w=1000&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    slug: 'kvkk',
    titleTr: 'KVKK Aydınlatma Metni',
    titleEn: 'KVKK Privacy Policy',
    summaryTr: '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki bilgilendirme metnimiz.',
    summaryEn: 'Privacy and Personal Data Protection Disclosure under Law No. 6698.',
    contentTr: `<h3>Kişisel Verilerin Korunması Aydınlatma Metni</h3><p>Kişisel verileriniz 6698 sayılı kanun kapsamında korunmaktadır.</p>`,
    contentEn: `<h3>Personal Data Protection Policy</h3><p>Your personal data is protected under law no 6698.</p>`,
    imageUrl: null
  }
];
