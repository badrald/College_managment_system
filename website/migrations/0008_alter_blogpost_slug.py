# Generated by Django 4.2.11 on 2024-05-07 17:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0007_alter_blogpost_body_alter_blogpost_post_cover'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='slug',
            field=models.SlugField(allow_unicode=True),
        ),
    ]
