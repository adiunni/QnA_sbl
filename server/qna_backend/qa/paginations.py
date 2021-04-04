from rest_framework import pagination
from rest_framework.response import Response


class QuestionPagination(pagination.LimitOffsetPagination):
    default_limit = 10
    limit_query_param = 'limit'
    offset_query_param = 'page'
    max_limit = 50

    # def get_paginated_response(self, data):
    #     response = Response(data)
    #     # response['count'] = self.page.paginator.count
    #     response['next'] = self.get_next_link()
    #     response['previous'] = self.get_previous_link()
    #     return response