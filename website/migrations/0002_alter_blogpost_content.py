# Generated by Django 4.2.11 on 2024-05-06 19:29

from django.db import migrations
import django_ckeditor_5.fields


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='content',
            field=django_ckeditor_5.fields.CKEditor5Field(blank=True, null=True),
        ),
    ]