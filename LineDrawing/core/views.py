from django.shortcuts import render
from django.views.generic import TemplateView,View
from django.http import JsonResponse

from core.models import PalmLine

class Index(TemplateView):
    """ Index page render """
    template_name='index.html'


class SaveAxis(View):
    """ Save Coordinates in db """
    def get(self,request,*args, **kwargs):
        if request.is_ajax():
            crd,created = PalmLine.objects.update_or_create(user=request.user)
            if created or not crd.lines:
                crd.lines={'coordinate':[eval(request.GET.get('coordinate'))]}
                crd.save()
            else:
                crd.lines['coordinate'].append(eval(request.GET.get('coordinate')))
                crd.save()
        return JsonResponse({'data':'save'},status=200)


class ClearAxis(View):
    """ Clear Coordinate """

    def get(self,request,*args, **kwargs):
        if request.is_ajax():
            palm = PalmLine.objects.get(user=request.user)
            palm.lines=None
            palm.save()
        return JsonResponse({'data':'clear'},status=200)


class LastAxis(View):
    """ Get Last Drawing line """

    def get(self,request,*args, **kwargs):
        if request.is_ajax():
            palm = PalmLine.objects.get(user=request.user)
            return JsonResponse({'coordinate':palm.lines['coordinate'][-1]},status=200)