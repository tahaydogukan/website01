import { motion } from 'framer-motion';
import { ArrowRight, Camera } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { galleryImages } from '../../data/gallery';

const GalleryPreview = () => {
  const previewImages = galleryImages.slice(0, 6);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          title="Fotoğraf Galerisi"
          subtitle="Etkinliklerimizden ve buluşmalarımızdan kareler"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {previewImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`relative rounded-2xl overflow-hidden shadow-card group cursor-pointer ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover ${
                  index === 0 ? 'h-64 md:h-full' : 'h-48 md:h-64'
                }`}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full mb-2">
                  {image.category}
                </span>
                <p className="text-white font-medium">{image.alt}</p>
              </div>

              {/* Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            to="/galeri"
            variant="primary"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Tüm Galeriye Git
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryPreview;
