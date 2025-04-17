
import { useEffect, useRef } from 'react';

interface StarFieldProps {
  className?: string;
}

const StarField = ({ className = '' }: StarFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create stars
    class Star {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 2;
        
        const brightness = Math.random() * 50 + 50;
        this.color = `rgba(${brightness}, ${brightness}, ${brightness + Math.random() * 30}, ${Math.random() * 0.5 + 0.5})`;
      }
      
      update() {
        this.z -= 0.5;
        if (this.z <= 0) {
          this.z = 1000;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }
      
      draw() {
        const scale = 1000 / this.z;
        const x = this.x * scale;
        const y = this.y * scale;
        const size = this.size * scale;
        
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(x, y, size < 0.5 ? 0.5 : size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }
    
    const stars = Array(200).fill(0).map(() => new Star());
    
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.update();
        star.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => window.removeEventListener('resize', setCanvasSize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute top-0 left-0 -z-10 ${className}`}
    />
  );
};

export default StarField;
