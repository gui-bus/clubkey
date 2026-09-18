### ImageCropper
A drag-and-resize canvas editor to crop selected images, supporting locking ratios, zooming, and output extraction.

**Import Path**:
```typescript
import { ImageCropper } from "@/src/components/ui/imageCropper/imageCropper";
```

#### Default
A standard cropper with locked 1:1 aspect ratio.

```tsx
<ImageCropper
  src="/utils/image-cropper.webp"
  aspectRatio={1}
  onCrop={(base64) => console.log(base64)}
/>
```

#### Crop Format
Selectable crop layout shapes. Choose between circular (default) and square formats.

```tsx
<ImageCropper
  src="/utils/image-cropper.webp"
  aspectRatio={1}
  circular={true}
/>

<ImageCropper
  src="/utils/image-cropper.webp"
  aspectRatio={1}
  circular={false}
/>
```

#### Aspect Ratios & Banners
Configure crop boxes for specific width and height pixel dimensions (such as 4K resolution 3840x2160). When width and height are provided, circular and square overlays are automatically disabled.

```tsx
<ImageCropper
  src="/utils/image-cropper-banner.webp"
  width={3840}
  height={2160}
  defaultZoom={55}
  onCrop={(base64) => console.log(base64)}
/>
```

#### Interactive Upload Flow
Upload your own picture using FileUpload first, then crop it using the ImageCropper.

```tsx
const [uploadedSrc, setUploadedSrc] = useState(null);

const handleFilesSelected = (files) => {
  if (files && files[0]) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) setUploadedSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

return (
  <div>
    {!uploadedSrc ? (
      <FileUpload
        label="Profile Picture Upload"
        accept="image/*"
        showPreviews={false}
        simulateProgress={false}
        onFilesSelected={handleFilesSelected}
      />
    ) : (
      <div>
        <ImageCropper src={uploadedSrc} aspectRatio={1} circular />
        <button onClick={() => setUploadedSrc(null)}>Upload different</button>
      </div>
    )}
  </div>
);
```

#### Props — ImageCropper
Props for the ImageCropper component.

| Prop | Type | Default | Description |
|---|---|---|---|
| src | string | required | Source URL path for target picture to edit |
| aspectRatio | number | 1 | Dimension ratio configuration constraint |
| circular | boolean | true | Renders a round cropping viewport overlay |
| showCropButton | boolean | true | If false, hides the built-in Crop button and results section (useful for custom external action flows) |
| width | number | undefined | Custom output crop box width in pixels. If set with height, circular/square presets are disabled. |
| height | number | undefined | Custom output crop box height in pixels. If set with width, circular/square presets are disabled. |
| onCrop | {"(base64: string) => void"} | undefined | Extraction hook returning cropped base64 PNG data |

