import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-full w-full min-h-[50vh]">
            <LoadingSpinner size="lg" />
        </div>
    );
}
