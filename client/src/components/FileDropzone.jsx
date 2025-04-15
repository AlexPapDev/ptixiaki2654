import { useState } from 'react'
import { Group, Text, Image, Stack, SimpleGrid } from '@mantine/core'
import { Upload, Image as ImageIcon, X } from 'lucide-react'
import { Dropzone } from '@mantine/dropzone'
// TODO: implement loading state
const FileDropzone = ({onFilesChange, multiple = false}) => {
  const [files, setFiles] = useState([])

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  })

  const handleDrop = (accepted) => {
    const newFiles = [...files, ...accepted]
    setFiles(newFiles)
    onFilesChange(newFiles)
  }

  const handleReject = (rejected) => {
    console.warn('Rejected files:', rejected)
    
  }
  return (<Stack>
    <Dropzone
      onDrop={handleDrop}
      onReject={handleReject}
      maxSize={5 * 1024 ** 2}
      accept={{'image/*': []}}
      multiple={multiple}
    >
      <Group justify="center" gap="xl" mih={190} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <Upload size={52} stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <X size={52} stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <ImageIcon size={52} color="grey" />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
    <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xs' : 0}>
      {previews}
    </SimpleGrid>
  </Stack>)
}
export default FileDropzone