from django.contrib import messages
from django.shortcuts import redirect
from django.views.generic import CreateView
from .forms import RegisterForm

class register_view(CreateView):
    template_name = "account/register.html"
    form_class = RegisterForm

    def form_valid(self, form):
        form.save()
        messages.success(self.request, 'Conta criada com sucesso! Você pode fazer login agora.')
        return redirect('login')

    def form_invalid(self, form):
        messages.error(self.request, "Erro ao registrar. Verifique os dados e tente novamente.")
        return super().form_invalid(form)
