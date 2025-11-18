interface ToastData {
  title: string;
  description?: string;
  type: "success" | "error" | "info" | "warning";
  position?: "topRight" | "topLeft" | "bottomRight" | "bottomLeft";
  cta?: string;
}

class ToastService {
  private sendNotification: ((data: ToastData) => void) | null = null;

  registerNotification(fn: (data: ToastData) => void) {
    this.sendNotification = fn;
  }

  sendToast(data: ToastData) {
    if (this.sendNotification) {
      this.sendNotification(data);
    } else {
      console.warn("ToastService: No notification handler registered.");
    }
  }
}

const toastService = new ToastService();

export default toastService;
