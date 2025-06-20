import React, { useRef, useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploadResult, setUploadResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    async function handleUpload(): Promise<void> {
        try {
            setLoading(true);
            setUploadResult(null);
            const formData = new FormData();
            const file = inputRef.current?.files?.[0];
            console.log(typeof file, file);
            if (!file) {
                alert("Please select a file first.");
                setLoading(false);
                return;
            }
            formData.append("file", file);
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            console.log("Image uploaded successfully:", data);
            setUploadResult(data); // Save response
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center">
            <Card className="w-full max-w-md mt-8 shadow-lg mx-2 sm:mx-4">
                <CardContent className="p-6 space-y-4">
                    <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
                        <FileIcon className="w-12 h-12" />
                        <span className="text-sm font-medium text-gray-500">Drag and drop a file or click to browse</span>
                        <span className="text-xs text-gray-500">PDF, image, video, or audio</span>
                    </div>
                    <div className="space-y-2 text-sm">
                        <Label htmlFor="file" className="text-sm font-medium">
                            File
                        </Label>
                        <Input ref={inputRef} id="file" type="file" placeholder="File" accept="image/*" />
                    </div>
                    {loading && (
                        <div className="flex justify-center items-center py-4">
                            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                        </div>
                    )}
                    {uploadResult && (
                        <div className="mt-4 p-4 border rounded bg-dark">
                            <div className="mb-2">
                                <strong>Market Price - </strong> {uploadResult.best_match_price?.marketPrice ? `$${uploadResult.best_match_price.marketPrice}` : 'N/A'}
                            </div>
                            <div className="mb-2">
                                {uploadResult.best_match?.imageUrl ? (
                                    <img src={uploadResult.best_match.imageUrl} alt="Card" className="w-32 h-auto mt-2 rounded shadow" />
                                ) : (
                                    <span>N/A</span>
                                )}
                            </div>
                            <div>
                                {uploadResult.best_match?.url ? (
                                    <a href={uploadResult.best_match.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View on TCGPlayer</a>
                                ) : 'N/A'}
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button size="lg" onClick={handleUpload} disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

interface FileIconProps extends React.SVGProps<SVGSVGElement> { }

function FileIcon(props: FileIconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
    )
}