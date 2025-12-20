import { LuFileText, LuX } from "react-icons/lu";


export default function NoteModal({ note, onClose }: { note: string; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">

            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                >
                    <LuX size={24} />
                </button>

                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <LuFileText className="text-emerald-500" />
                    İşlem Notu
                </h3>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700 text-sm leading-relaxed max-h-[60vh] overflow-y-auto whitespace-pre-wrap">
                    {note}
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
};