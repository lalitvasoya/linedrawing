# Generated by Django 3.0.4 on 2020-06-11 10:59

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_palmline_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='palmline',
            name='lines',
            field=django.contrib.postgres.fields.jsonb.JSONField(null=True),
        ),
    ]
