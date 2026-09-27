type PublishModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function PublishModal({ open, onClose }: PublishModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-2xl font-black">发布到屿途知汇</div>

        <p className="mt-2 text-sm text-neutral-400">
          先把发布入口做好，下一步再接真实用户与数据库。
        </p>

        <div className="mt-7 grid grid-cols-3 gap-3">
          {["服务", "商品", "需求"].map((type) => (
            <button
              key={type}
              onClick={() => {
                alert(`${type}发布流程下一步接入数据库。`);
                onClose();
              }}
              className="rounded-2xl border border-black/5 bg-[#fafaf8] py-5 text-sm font-bold transition hover:border-black/15 hover:bg-white"
            >
              {type}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-black py-3.5 text-sm font-bold text-white"
        >
          关闭
        </button>
      </div>
    </div>
  );
}