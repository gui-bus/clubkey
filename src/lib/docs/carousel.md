### Carousel
A touch-enabled, responsive slider component for cycling through images, cards, or custom content with support for autoplay, vertical orientation, and pagination dots with navigation controls.

**Import Path**:
```typescript
import { Carousel } from "@/src/components/ui/carousel/carousel";
```

#### Default
Standard image slider with navigation buttons placed alongside pagination dots underneath.

```tsx
<Carousel className="w-full">
  <CarouselContent>
    {images.map((src, index) => (
      <CarouselItem key={index}>
        <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 aspect-video">
          <img src={src} alt={\`Slide \${index + 1}\
```

#### Header Controls
Place navigation buttons inside a section header alongside the title while keeping dots underneath.

```tsx
<Carousel className="w-full">
  <div className="flex items-center justify-between mb-4">
    <h4 className="font-semibold text-lg">Featured Collections</h4>
    <div className="flex items-center gap-2">
      <CarouselPrevious />
      <CarouselNext />
    </div>
  </div>

  <CarouselContent className="-ml-3">
    {features.map((item, index) => (
      <CarouselItem key={index} className="pl-3 basis-full sm:basis-1/2 md:basis-1/3">
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-40">
          <h5>{item.title}</h5>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselDots className="mt-4" />
</Carousel>
```

#### Testimonial Quote Carousel
Display customer testimonials and reviews with bottom navigation buttons and dots.

```tsx
<Carousel className="w-full">
  <CarouselContent className="-ml-3">
    {testimonials.map((item, index) => (
      <CarouselItem key={index} className="pl-3 basis-full sm:basis-1/2">
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <p>"{item.comment}"</p>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>

  <div className="flex items-center justify-center gap-3 mt-4">
    <CarouselPrevious />
    <CarouselDots />
    <CarouselNext />
  </div>
</Carousel>
```

#### Autoplay Carousel
Set 'autoplay' to true to automatically transition slides at specified intervals.

```tsx
<Carousel autoplay autoplayDelay={2500} className="w-full">
  <CarouselContent>
    {images.map((src, index) => (
      <CarouselItem key={index}>
        <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 aspect-video">
          <img src={src} alt="Slide" className="size-full object-cover" />
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>

  <div className="flex items-center justify-center gap-3 mt-4">
    <CarouselPrevious />
    <CarouselDots />
    <CarouselNext />
  </div>
</Carousel>
```

#### Vertical Carousel
Set 'orientation' to 'vertical' to scroll slides along the vertical axis.

```tsx
<Carousel orientation="vertical" className="w-full max-w-sm h-56">
  <CarouselContent className="h-56">
    {Array.from({ length: 5 }).map((_, index) => (
      <CarouselItem key={index} className="pt-2 h-full">
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 h-48">
          <span>Vertical Slide {index + 1}</span>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>

  <div className="flex items-center justify-center gap-3 mt-4">
    <CarouselPrevious />
    <CarouselDots />
    <CarouselNext />
  </div>
</Carousel>
```

#### Thumbnail Navigation
Render a dedicated image thumbnail navigation bar using CarouselThumbs underneath the main slider.

```tsx
<Carousel className="w-full">
  <CarouselContent>
    {images.map((src, index) => (
      <CarouselItem key={index}>
        <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 aspect-video">
          <img src={src} alt="Slide" className="size-full object-cover" />
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>

  <CarouselThumbs images={images} className="mt-3" />
</Carousel>
```

#### Free Drag & Swipe Sensitivity
Use 'dragFree' for continuous physics momentum scrolling and 'swipeThreshold' to customize gesture sensitivity on touch devices.

```tsx
<Carousel dragFree swipeThreshold={5} className="w-full">
  <CarouselContent className="-ml-3">
    {features.map((item, index) => (
      <CarouselItem key={index} className="pl-3 basis-2/3 sm:basis-1/3">
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <h5>{item.title}</h5>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselDots className="mt-4" />
</Carousel>
```

#### Infinite Loop
Set 'loop' to true to enable infinite cycling through slides. Transitioning past the last item returns to the first item with a continuous forward motion.

```tsx
<Carousel loop className="w-full">
  <CarouselContent>
    {images.map((src, index) => (
      <CarouselItem key={index}>
        <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 aspect-video">
          <img src={src} alt="Slide" className="size-full object-cover" />
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>

  <div className="flex items-center justify-center gap-3 mt-4">
    <CarouselPrevious />
    <CarouselDots />
    <CarouselNext />
  </div>
</Carousel>
```

#### Props — Carousel
Properties for configuring the Carousel component.

| Prop | Type | Default | Description |
|---|---|---|---|
| orientation | 'horizontal' | 'vertical' | 'horizontal' | Axis orientation for slide motion and navigation controls. |
| autoplay | boolean | false | Enables automatic slide transitions. |
| autoplayDelay | number | 3000 | Interval in milliseconds between automatic slide transitions. |
| pauseOnHover | boolean | true | Pauses autoplay progression when mouse hovers over the slider container. |
| dragFree | boolean | false | Enables free momentum drag physics without snap-to-grid constraints. |
| swipeThreshold | number | 10 | Pixel distance threshold to trigger swipe navigation on touch devices. |
| loop | boolean | false | Enables infinite looping when navigating slides. |
| opts | EmblaOptionsType | — | Configuration options passed directly to Embla Carousel instance. |
| setApi | {"(api: CarouselApi) => void"} | — | Callback function to receive the Embla Carousel API instance. |

