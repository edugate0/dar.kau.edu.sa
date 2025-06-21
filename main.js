// ملف JavaScript الأساسي لبوابة التحويل الخارجي

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // إضافة تأثيرات الحركة للبطاقات
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // إضافة تأثيرات للأزرار
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // إضافة تأثير الضغط
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // تحسين تجربة المستخدم للنماذج
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});

// دالة للتحقق من صحة البيانات
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            input.style.borderColor = '#28a745';
        }
    });
    
    return isValid;
}

// دالة لعرض رسائل التنبيه
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        max-width: 300px;
    `;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// دالة لتنسيق الأرقام
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// دالة للتحقق من صحة الملفات المرفوعة
function validateFile(file, maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']) {
    if (file.size > maxSize) {
        showAlert('حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت', 'error');
        return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
        showAlert('نوع الملف غير مدعوم. يرجى رفع ملف PDF أو صورة', 'error');
        return false;
    }
    
    return true;
}

// دالة لحفظ البيانات محلياً
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('خطأ في حفظ البيانات:', e);
        return false;
    }
}

// دالة لاسترجاع البيانات المحفوظة
function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('خطأ في استرجاع البيانات:', e);
        return null;
    }
}

// دالة لتوليد رقم مرجعي
function generateReference(prefix = 'REF') {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    return `${prefix}-${year}${month}${day}-${random}`;
}

// دالة لطباعة الصفحة
function printPage() {
    window.print();
}

// دالة للتمرير السلس
function smoothScroll(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// إضافة مستمعات الأحداث للتفاعلات المتقدمة
document.addEventListener('DOMContentLoaded', function() {
    // تحسين تجربة المستخدم للنماذج
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'جاري المعالجة...';
                
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = submitButton.getAttribute('data-original-text') || 'إرسال';
                }, 2000);
            }
        });
    });
    
    // حفظ النص الأصلي للأزرار
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(button => {
        button.setAttribute('data-original-text', button.textContent);
    });
});

