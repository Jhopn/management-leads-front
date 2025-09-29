interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50" onClick={onClose}>
            <div className="w-full max-w-lg p-6 my-8 bg-black rounded-lg shadow-xl" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};