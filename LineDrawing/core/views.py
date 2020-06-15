from django.shortcuts import render
from django.views.generic import TemplateView,View
from django.http import JsonResponse

from core.models import PalmLine

class Index(TemplateView):
    """ Index page render """
    template_name='index.html'


class SaveAxes(View):
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


class ClearAxes(View):
    """ Clear Coordinate """

    def get(self,request,*args, **kwargs):
        if request.is_ajax():
            palm = PalmLine.objects.get(user=request.user)
            palm.lines=None
            palm.save()
        return JsonResponse({'data':'clear'},status=200)


class GetLines(View):
    """ Get Lasts Drawing line """

    def get(self,request,*args, **kwargs):
        if request.is_ajax():
            palm = PalmLine.objects.get(user=request.user)
            if request.GET.get('which')=='last':
                return JsonResponse({'coordinate':palm.lines['coordinate'][-1]},status=200)
            else:
                return JsonResponse({'coordinate':palm.lines['coordinate']},status=200)