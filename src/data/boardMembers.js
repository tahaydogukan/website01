export const boardMembers = [
  { id: 15, name: 'Vefa Günüçay', title: 'Üye', image: '/images/members/vefa-gunucay.jpg' },
  { id: 3, name: 'Osman Dağlar', title: 'Başkan Vekili', image: '/images/members/osman-daglar.jpg' },
  { id: 18, name: 'Doğukan Alkan', title: 'Üye', image: '/images/members/dogukan-alkan.jpg' },
  { id: 13, name: 'Abdülkebir Gündoğdu', title: 'Üye', image: '/images/members/abdulkebir-gundogdu.jpg' },
  { id: 11, name: 'Zafer Uzuner', title: 'Üye', image: '/images/members/zafer-uzuner.jpg' },
  { id: 20, name: 'Ahmet Demir', title: 'Üye', image: '/images/members/ahmet-demir.jpg' },
  { id: 22, name: 'Ensar Güzel', title: 'Üye', image: '/images/members/ensar-guzel.jpg' },
  { id: 12, name: 'Batuhan Uçar', title: 'Üye', image: '/images/members/batuhan-ucar.jpg' },
  { id: 6, name: 'Ahmet Öztürk', title: 'Üye', image: '/images/members/ahmet-ozturk.jpg' },
  { id: 4, name: 'Hasan Yıldız', title: 'Üye', image: '/images/members/hasan-yildiz.jpg' },
  { id: 2, name: 'Mustafa Uğur', title: 'Başkan Yardımcısı', image: '/images/members/mustafa-ugur.jpg' },
  { id: 19, name: 'Ali Altaş', title: 'Üye', image: '/images/members/ali-altas.jpg' },
  { id: 21, name: 'Haşim Almatopu', title: 'Üye', image: '/images/members/hasim-almatopu.jpg' },
  { id: 14, name: 'İbrahim Sayan', title: 'Üye', image: '/images/members/ibrahim-sayan.jpg' },
  { id: 17, name: 'Emre Mumcu', title: 'Üye', image: '/images/members/emre-mumcu.jpg' },
  { id: 16, name: 'Deniz Demir', title: 'Üye', image: '/images/members/deniz-demir.jpg' },
  { id: 5, name: 'Suat Doğukan', title: 'Üye', image: '/images/members/suat-dogukan.jpg', imagePosition: '65% center' },
  { id: 1, name: 'Mehdi Kaya', title: 'Başkan', image: '/images/members/mehdi-kaya.jpg' },
].reverse().map((member) => ({
  ...member,
  // Refresh cached portraits after correcting the photo order.
  image: `${member.image}?v=2`,
}));
