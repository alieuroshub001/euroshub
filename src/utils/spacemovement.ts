// utils/spaceMovement.ts

export interface SpaceElement {
  element: HTMLElement;
  speed: number;
  direction: { x: number; y: number };
}

export class SpaceMovement {
  private animationRef: number | null = null;
  private lastTimeRef: number = 0;
  private elements: SpaceElement[] = [];

  constructor(private container: HTMLElement) {}

  addElement(element: SpaceElement): void {
    this.elements.push(element);
  }

  addElements(elements: SpaceElement[]): void {
    this.elements.push(...elements);
  }

  clearElements(): void {
    this.elements = [];
  }

  start(): void {
    if (this.animationRef) return;

    const animate = (time: number) => {
      if (!this.lastTimeRef) this.lastTimeRef = time;
      const deltaTime = time - this.lastTimeRef;
      this.lastTimeRef = time;

      this.updateElementPositions(deltaTime);
      this.animationRef = requestAnimationFrame(animate);
    };

    this.animationRef = requestAnimationFrame(animate);
  }

  stop(): void {
    if (this.animationRef) {
      cancelAnimationFrame(this.animationRef);
      this.animationRef = null;
    }
  }

  private updateElementPositions(deltaTime: number): void {
    const containerRect = this.container.getBoundingClientRect();

    this.elements.forEach((spaceElement) => {
      const rect = spaceElement.element.getBoundingClientRect();
      
      // Calculate current position in percentages
      let x = (rect.left - containerRect.left) / containerRect.width * 100;
      let y = (rect.top - containerRect.top) / containerRect.height * 100;
      
      // Update position based on direction and speed
      x += spaceElement.direction.x * spaceElement.speed * (deltaTime / 16);
      y += spaceElement.direction.y * spaceElement.speed * (deltaTime / 16);
      
      // Wrap around when going off screen
      if (x > 100) x = -5;
      if (x < -5) x = 100;
      if (y > 100) y = -5;
      if (y < -5) y = 100;
      
      spaceElement.element.style.left = `${x}%`;
      spaceElement.element.style.top = `${y}%`;
    });
  }

  // Method to create shooting star animation
  createShootingStar(star: HTMLElement, speed: number, direction: { x: number; y: number }): void {
    const angle = Math.random() * 360;
    
    const shoot = () => {
      star.style.transition = 'none';
      star.style.opacity = '0';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      setTimeout(() => {
        star.style.transition = `opacity 0.5s ease-out, transform ${speed}s linear`;
        star.style.opacity = '1';
        star.style.transform = `translateX(${500 * direction.x}px) translateY(${500 * direction.y}px) rotate(${angle}deg)`;
        
        setTimeout(() => {
          star.style.opacity = '0';
          setTimeout(shoot, Math.random() * 10000 + 5000);
        }, speed * 1000);
      }, 50);
    };
    
    shoot();
  }
}