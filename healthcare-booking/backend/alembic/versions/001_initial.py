
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = '001'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('password_hash', sa.String(), nullable=True),
    sa.Column('role', sa.String(), nullable=True),
    sa.CheckConstraint("role IN ('patient', 'doctor', 'admin')", name='role_check'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=True)
    
    op.create_table('doctors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('specialization', sa.String(), nullable=True),
    sa.Column('start_hour', sa.Integer(), nullable=True),
    sa.Column('end_hour', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('is_available', sa.Boolean(), server_default='1'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_doctors_id'), 'doctors', ['id'], unique=False)

    op.create_table('appointments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('doctor_id', sa.Integer(), nullable=True),
    sa.Column('patient_name', sa.String(), nullable=True),
    sa.Column('slot', sa.TIMESTAMP(), nullable=True),
    sa.ForeignKeyConstraint(['doctor_id'], ['doctors.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_appointments_id'), 'appointments', ['id'], unique=False)

def downgrade() -> None:
    op.drop_index(op.f('ix_appointments_id'), table_name='appointments')
    op.drop_table('appointments')
    op.drop_index(op.f('ix_doctors_id'), table_name='doctors')
    op.drop_table('doctors')
    op.drop_index(op.f('ix_users_username'), table_name='users')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_table('users')
