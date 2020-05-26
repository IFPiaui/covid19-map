from django.shortcuts import redirect
from django.views.generic import TemplateView
from .models import CasosPorCidadePiaui
from datetime import date, datetime
import json
import requests
import contextlib
import csv
from . import dataPersistenceHandler as dph

def soma_obitos_piaui(dados_sesapi):
    for cidade in list(reversed(json.loads(dados_sesapi))):
        if cidade['city'] == 'PIAUÍ': 
            return cidade['deaths']

def soma_casos_piaui(dados_sesapi):
    for cidade in list(reversed(json.loads(dados_sesapi))):
        if cidade['city'] == 'PIAUÍ': 
            return cidade['confirmed']


def soma_descartados_piaui(dados_sesapi):
    for cidade in list(reversed(json.loads(dados_sesapi))):
        if cidade['city'] == 'PIAUÍ': 
            return cidade['discards']


def soma_confSexoMale_piaui(dados_sesapi):
    for cidade in list(reversed(json.loads(dados_sesapi))):
        if cidade['city'] == 'PIAUÍ': 
            return cidade['confMale']
        

def soma_confSexoFemi_piaui(dados_sesapi):
    for cidade in list(reversed(json.loads(dados_sesapi))):
        if cidade['city'] == 'PIAUÍ': 
            return cidade['confFeminine']
        
        
def soma_obtSexoMale_piaui(dados_sesapi):
    for cidade in list(reversed(json.loads(dados_sesapi))):
        if cidade['city'] == 'PIAUÍ': 
            return cidade['obtMale']
        
        
def soma_obtSexoFemi_piaui(dados_sesapi):
    for cidade in list(reversed(json.loads(dados_sesapi))):
        if cidade['city'] == 'PIAUÍ': 
            return cidade['obtFeminine']


def soma_altas_piaui(dados_sesapi):
    for cidade in list(reversed(json.loads(dados_sesapi))):
        if cidade['city'] == 'PIAUÍ': 
            return cidade['cured']


def soma_obitos_brasil(data_brasil):
    soma = 0 
    for state in data_brasil:
        soma += int(state['deaths'])
    return soma


def soma_casos_brasil(data_brasil):
    soma = 0 
    for state in data_brasil:
        soma += int(state['confirmed'])
    return soma
    

def deaths_for_state(data_new_confirmed):
    data_parsed = []
    for state in data_new_confirmed:
        parsed = state['state'], int(state['last_available_deaths'])
        data_parsed.append(parsed)
    return sorted(data_parsed, key=lambda tup: tup[1], reverse=True)


def new_cases_for_state(data_new_confirmed):
    data_parsed = []
    for state in data_new_confirmed:
        parsed = state['state'], int(state['new_confirmed'])
        data_parsed.append(parsed)
    return sorted(data_parsed, key=lambda tup: tup[1], reverse=True)


def new_deaths_for_state(data_new_confirmed):
    data_parsed = []
    for state in data_new_confirmed:
        parsed = state['state'], int(state['new_deaths'])
        data_parsed.append(parsed)
    return sorted(data_parsed, key=lambda tup: tup[1], reverse=True)


def get_casos_por_estado(data):
    data_parsed = []
    for state in data:
        parsed = 'br-' + state['state'].lower(), int(state['confirmed'])
        data_parsed.append(parsed)
    return data_parsed 


def get_request_ultimos_dados(url):
    response = requests.get(url)
    response = json.loads(response.text)
    data = response['results']
    return data
        

def get_request_data_new_cases_for_state(url):
    response = requests.get(url)
    response = json.loads(response.text)
    data = response['results']
    return data


def get_request_data_new_cases(url):
    response = requests.get(url)
    response = json.loads(response.text)

    data_parsed = []
    for data in response:
        parsed = date(date.today().year, int(data['label'][4::]), int(data['label'][:2:])), data['data']
        data_parsed.append(parsed)
    return data_parsed


def get_request_data(url):
    response = requests.get(url)
    response = json.loads(response.text)

    data_parsed = []
    for data in response:
        parsed = date(int(data['data'][:4:]), int(data['data'][5:7:]), int(data['data'][8:10:])), data['quantidade']
        data_parsed.append(parsed)
    return data_parsed


def casos_confirmados():
    url = 'http://coronavirus.pi.gov.br/public/api/casos/confirmados.json'
    return get_request_data(url)


def historico_mortes():
    url = 'http://coronavirus.pi.gov.br/public/api/casos/obitos.json'
    return get_request_data(url)


def novos_casos():
    url = 'http://coronavirus.pi.gov.br/public/api/novos-casos.json'
    return get_request_data_new_cases(url)


def cases_for_state():
    url = 'https://brasil.io/api/dataset/covid19/caso/data/?format=json&place_type=state&is_last=True'
    return get_request_ultimos_dados(url)


def new_confirmed_for_state():
    url = 'https://brasil.io/api/dataset/covid19/caso_full/data/?format=json&place_type=state&is_last=True'
    return get_request_data_new_cases_for_state(url)

def get_request_data_comorbidades(url):
    """
    Carregar o arquivo a apartir da URL e preparar a lista fazendo a iteração nos registros
    """
    dados_comorbidades = []
    response = requests.get(url, stream=True)
    response.encoding = response.apparent_encoding #definir uft-8
    registros = csv.reader(response.text.strip().split('\n'))
    ''' 
    #Outra forma de obter os registros do arquivo, verificar melhor desempenho
    arquivo = (line.decode('utf-8') for line in response.iter_lines())
    registros = csv.reader(arquivo, delimiter=',', quotechar='"', )
    '''
    next(registros)
    for registro in registros:
        linha = registro[0], registro[1]
        dados_comorbidades.append(linha)
    
    return sorted(dados_comorbidades, key=lambda tup: int(tup[1]), reverse=True)

def registros_comorbidades():
    """
    Preparação da URL do GoogleDocs que contém todos os dados disponibilizada pela SESAPI
    Obrigatório setar o identificador da planilha com os dados desejados
    Ex: planilha=687147050 aponta para os dados de comorbidades
    """
    url = 'https://docs.google.com/spreadsheets/d/1b-GkDhhxJIwWcA6tk3z4eX58f-f1w2TA2f2XrI4XB1w/edit#gid={planilha}'
    url = url.replace('/edit#gid=', '/export?format=csv&gid=').format(planilha=687147050)
    return get_request_data_comorbidades(url)


class Index(TemplateView):

    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        queryset = CasosPorCidadePiaui.objects.all()
        data_brasil_sum = cases_for_state()
        data_new_confirmed = new_confirmed_for_state()

        """
        DATA PERSISTENCE HANDLER
        dados_sesapi recebe os dados do JSON recuperados
        do painel de monitoramento Covid-19 da SESAPI
        """
        atualizado = dph.checkUpdates() #FOR TESTING
        dados_sesapi = dph.loadLocalData()
        dados_sesapi = dados_sesapi.replace("'", "`")
        
        # CONTEXT
        #context['casos_por_cidades'] = queryset
        context['soma_obitos_por_cidade'] = soma_obitos_piaui(dados_sesapi)
        context['soma_casos_por_cidade'] = soma_casos_piaui(dados_sesapi)
        context['soma_altas_piaui'] = soma_altas_piaui(dados_sesapi)
        context['soma_descartados_piaui'] = soma_descartados_piaui(dados_sesapi)
        context['casosConfirmados'] = casos_confirmados()
        context['historicoMortes'] = historico_mortes()
        context['novosCasos'] = novos_casos()
        context['casos_por_estado'] = get_casos_por_estado(data_brasil_sum)
        context['soma_obitos_brasil'] = soma_obitos_brasil(data_brasil_sum)
        context['soma_casos_brasil'] = soma_casos_brasil(data_brasil_sum)
        context['new_cases_for_state'] = new_cases_for_state(data_new_confirmed)
        context['new_deaths_for_state'] = new_deaths_for_state(data_new_confirmed)
        context['deaths_for_state'] = deaths_for_state(data_new_confirmed)
        context['comorbidades'] = registros_comorbidades()
        context['confMale'] = soma_confSexoMale_piaui(dados_sesapi)
        context['confFeminine'] = soma_confSexoFemi_piaui(dados_sesapi)
        context['obtMale'] = soma_obtSexoMale_piaui(dados_sesapi)
        context['obtFeminine'] = soma_obtSexoFemi_piaui(dados_sesapi)
        context['dados_sesapi'] = dados_sesapi
        context['atualizado'] = atualizado
        return context
