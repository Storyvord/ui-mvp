import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CustomFileInputProps {
  value: File | File[] | null;
  onChange: (value: File | File[] | null) => void;
  isMulti?: boolean;
  error?: any;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  value,
  onChange,
  isMulti = false,
  error,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (isMulti) {
        const filesArray = Array.from(files);
        const uniqueFiles = Array.isArray(value) ? [...value] : [];
        filesArray.forEach((file) => {
          const exists = uniqueFiles.some(
            (existingFile: File) =>
              existingFile.name === file.name && existingFile.size === file.size
          );
          if (!exists) {
            uniqueFiles.push(file);
          }
        });
        onChange(uniqueFiles);
      } else {
        onChange(files[0]);
      }
      e.target.value = ""; // Reset input
    }
  };

  const handleRemoveFile = (index: number) => {
    if (isMulti && Array.isArray(value)) {
      const updatedFiles = [...value];
      updatedFiles.splice(index, 1);
      onChange(updatedFiles);
    } else if (!isMulti && value) {
      // Handle single file removal
      onChange(null);
    }
  };

  return (
    <div className="space-y-2">
      <Button variant="outline" asChild>
        <label className="cursor-pointer flex items-center space-x-2 w-full">
          <span>Select {isMulti ? "Files" : "File"}</span>
          <input
            type="file"
            multiple={isMulti}
            className="hidden"
            onChange={handleFileChange}
            accept={allowedTypes.join(",")}
          />
        </label>
      </Button>
      {error && <p className="text-sm text-red-600">{error.message}</p>}
      {isMulti ? (
        <div className="flex flex-wrap gap-2">
          {Array.isArray(value) && value.length > 0 ? (
            value.map((file: File, index: number) => (
              <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                <span>{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveFile(index)}
                  aria-label={`Remove ${file.name}`}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </Badge>
            ))
          ) : (
            <p className="text-sm text-gray-500">No files selected.</p>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          {value ? (
            <>
              <span className="text-sm text-gray-700">{(value as File).name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveFile(0)}
                aria-label={`Remove ${(value as File).name}`}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </>
          ) : (
            <p className="text-sm text-gray-500">No file selected.</p>
          )}
        </div>
      )}
    </div>
  );
};

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export default CustomFileInput;
