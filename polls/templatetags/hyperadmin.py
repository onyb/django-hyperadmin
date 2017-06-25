from html.parser import HTMLParser
from xml.etree import cElementTree as etree

from django.template import Node, Library

register = Library()


class HyperScript(Node):
    def render(self, context):
        form = context['adminform']

        fieldsets = []
        for fieldset in form:
            for line in fieldset:
                fields = []
                for field in line:
                    bound_field = field.__dict__.pop('field')
                    hscript_str = str(bound_field)
                    parser.feed(hscript_str)
                    root = parser.close()

                    bound_field.__dict__.pop('form')
                    bound_field.__dict__.pop('field')

                    fields.append(
                        dict(
                            field=bound_field.__dict__,
                            hyperscript=[e.to_json() for e in root],
                            **field.__dict__
                        )
                    )

                fieldsets.append(fields)

        context['json'] = fieldsets
        return ''


@register.tag
def generate_hyperscript(parser, token):
    return HyperScript()


class H(etree.Element):
    def __repr__(self):
        return 'h({tag}, {attrs}, {children})'.format(
            tag=self.tag, attrs=dict(self.items()),
            children=', '.join([child.__repr__() for child in self])
        )

    def to_json(self):
        return {
            'tag': self.tag,
            'attributes': dict(self.items()),
            'children': [child.to_json() for child in self]
        }


class DOMParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tb = etree.TreeBuilder(element_factory=H)
        self.tb.start("root", {})

    def handle_starttag(self, tag, attributes):
        self.tb.start(tag, dict(attributes))

    def handle_endtag(self, tag):
        self.tb.end(tag)

    def handle_data(self, data):
        self.tb.data(data)

    def close(self):
        HTMLParser.close(self)
        return self.tb.close()


parser = DOMParser()
