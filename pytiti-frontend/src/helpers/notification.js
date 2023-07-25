import { notify } from "@kyvg/vue3-notification";

class NotificationHelper {

  showNotification(title, text  = null, duration = 5000, type = null) {
    const config = {
      title,
      duration,
      text,
      type
    }

    if(text){ config.text = text; }

    if(type){ config.type = type; }
    
    notify(config);
  }

  error(text, title = null,  duration = 7500){
    this.showNotification(title, text, duration, "error")
  }

  success(text, title = null,  duration = 7500){
    this.showNotification(title, text, duration, "success")
  }

  info(text, title = null,  duration = 7500){
    this.showNotification(title, text, duration)
  }

}

export default new NotificationHelper();
